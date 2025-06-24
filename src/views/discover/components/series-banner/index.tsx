import { useMemo, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import { NavLink } from 'react-router';
import { useTvGenres } from '@/hooks/useTVGenres';
import { useQuery } from '@tanstack/react-query';
import getSeriesTrailer from '@/views/series-details/actions/get-series-trailer';
import Rating from '@/views/series-details/components/rating';
import Title from '@/views/series-details/components/title';
import Genres from '@/views/series-details/widgets/genres';
import TrailerModal from '@/components/trailer-modal';
import TextFade from '@/components/ui/text-fade';
import { getTMDBImageUrl } from '@/lib/utils';
import type { Series } from '@/types/tmdb';

interface Props {
	series: Series;
}

export default function SeriesBanner({ series }: Props) {
	const [highResLoaded, setHighResLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data: genreMap } = useTvGenres();
	const { data: trailersData } = useQuery({
		queryKey: ['series-trailer', series.id],
		queryFn: () => getSeriesTrailer(series.id)
	});

	const genreNames = (series.genre_ids || [])
		.map((id) => ({
			id,
			name: genreMap?.[id]
		}))
		.filter(
			(genre): genre is { id: number; name: string } =>
				typeof genre.name === 'string'
		);

	const trailer = useMemo(() => {
		const trailers = trailersData?.results ?? [];
		return (
			trailers.find((t) => t.site === 'YouTube' && t.type === 'Trailer') ?? null
		);
	}, [trailersData]);

	const openModal = () => {
		if (!trailer) return;
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="relative aspect-[244/100] w-full overflow-hidden rounded-4xl border-2 border-white/20">
			<div className="relative z-30 flex size-full flex-col p-[140px]">
				<Genres genres={genreNames} className="mb-[57px]" />
				<div className="mb-[27px] flex flex-col gap-3.5">
					<Title
						name={series.name}
						countryCode={series.origin_country[0]}
            // @ts-expect-error THIS season type has first_air_date
						firstAirDate={series.first_air_date}
					/>
					<TextFade className="max-w-[661px]">
						{series.overview.split('').slice(0, 200).join('') + '...'}
					</TextFade>
				</div>
				<div className="flex gap-3.5">
					{trailer ? (
						<button
							className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-[#71C1FF]/25 bg-gradient-to-tl from-[#475B60] to-[#2D414C] px-6 py-[18px] transition-all duration-300 ease-in-out hover:scale-105"
							onClick={openModal}
						>
							<FaPlay className="size-[18px]" />
							<div className="h-[18px] w-px bg-white/15" />
							<span className="font-medium text-white/65">Watch a trailer</span>
						</button>
					) : null}
					<NavLink
						to={`/series/${series.id}`}
						className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-white/15 px-6 py-[18px] backdrop-blur-3xl transition-all duration-300 ease-in-out hover:scale-105"
					>
						<IoIosInformationCircle className="size-[22px]" />
						<div className="h-[18px] w-px bg-white/15" />
						<span className="font-medium text-white/65">More About</span>
					</NavLink>
				</div>

				<Rating
					rating={series.vote_average}
					voteCount={series.vote_count}
					className="absolute top-[120px] right-[140px]"
				/>
			</div>
			<div className="absolute top-0 left-0 z-20 size-full bg-gradient-to-r from-black/90 to-black/20 to-80%" />
			{series.backdrop_path && (
				<>
					<img
						src={getTMDBImageUrl(series.backdrop_path, 'w92')}
						className="absolute top-0 left-0 z-0 size-full object-cover blur-lg"
						aria-hidden="true"
					/>
					<img
						src={getTMDBImageUrl(series.backdrop_path, 'original')}
						alt={series.name}
						onLoad={() => setHighResLoaded(true)}
						style={{ opacity: highResLoaded ? 1 : 0 }}
						className="absolute top-0 left-0 z-10 size-full object-cover"
					/>
				</>
			)}

			<TrailerModal
				trailerKey={trailer?.key ?? ''}
				isOpen={isModalOpen}
				onClose={closeModal}
			/>
		</div>
	);
}
