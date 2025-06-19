import { FaPlay } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import { NavLink } from 'react-router';
import { useTvGenres } from '@/hooks/useTVGenres';
import Rating from '@/views/series-details/components/rating';
import Title from '@/views/series-details/components/title';
import Genres from '@/views/series-details/widgets/genres';
import TextFade from '@/components/ui/text-fade';
import { getTMDBImageUrl } from '@/lib/utils';

interface Props {
	series: unknown;
}

export default function SeriesBanner({ series }: Props) {
	const { data: genreMap } = useTvGenres();

	// @ts-expect-error No series type
	const genreNames = (series.genre_ids || [])
		.map((id: number) => ({
			name: genreMap?.[id]
		}))
		// @ts-expect-error No genre type
		.filter((genre) => genre.name);

	return (
		<div className="relative aspect-[244/100] w-full overflow-hidden rounded-4xl border-2 border-white/20">
			<div className="relative z-20 flex size-full flex-col p-[140px]">
				<Genres genres={genreNames} className="mb-[57px]" />
				<div className="mb-[27px] flex flex-col gap-3.5">
					<Title
						//@ts-expect-error No series type
						name={series.name}
						//@ts-expect-error No series type
						countryCode={series.origin_country[0]}
						//@ts-expect-error No series type
						firstAirDate={series.first_air_date}
					/>
					<TextFade className="max-w-[661px]">
						{/* @ts-expect-error No series type */}
						{series.overview.split('').slice(0, 200).join('') + '...'}
					</TextFade>
				</div>
				<div className="flex gap-3.5">
					<button className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-[#71C1FF]/25 bg-gradient-to-tl from-[#475B60] to-[#2D414C] px-6 py-[18px] transition-all duration-300 ease-in-out hover:scale-105">
						<FaPlay className="size-[18px]" />
						<div className="h-[18px] w-px bg-white/15" />
						<span className="font-medium text-white/65">Watch a trailer</span>
					</button>
					<NavLink
						// @ts-expect-error No series type
						to={`/series/${series.id}`}
						className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-white/15 px-6 py-[18px] backdrop-blur-3xl transition-all duration-300 ease-in-out hover:scale-105"
					>
						<IoIosInformationCircle className="size-[22px]" />
						<div className="h-[18px] w-px bg-white/15" />
						<span className="font-medium text-white/65">More About</span>
					</NavLink>
				</div>

				<Rating
					//@ts-expect-error No series type
					rating={series.vote_average}
					//@ts-expect-error No series type
					voteCount={series.vote_count}
					className="absolute top-[120px] right-[140px]"
				/>
			</div>
			<div className="absolute top-0 left-0 z-10 size-full bg-gradient-to-r from-black/90 to-black/20 to-80%" />
			<img
				//@ts-expect-error No series type
				src={getTMDBImageUrl(series.backdrop_path, 'original')}
				//@ts-expect-error No series type
				alt={series.name}
				className="absolute top-0 left-0 z-0 size-full object-cover"
			/>
		</div>
	);
}
