import { useMemo, useState } from 'react';
import { FaPlay, FaRegStar, FaStar } from 'react-icons/fa';
import { useFavorites } from '@/hooks/useFavorites';
import { useQuery } from '@tanstack/react-query';
import TrailerModal from '@/components/trailer-modal';
import TextFade from '@/components/ui/text-fade';
import { getTMDBImageUrl } from '@/lib/utils';
import getSeriesTrailer from '../../actions/get-series-trailer';

interface Props {
	seriesId: string;
	posterPath: string | null;
	status: string;
}

const Poster = ({ seriesId, posterPath, status }: Props) => {
	const trailerQuery = useQuery({
		queryKey: ['series-trailer', seriesId],
		queryFn: () => getSeriesTrailer(seriesId)
	});

	const [highResLoaded, setHighResLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const trailer = useMemo(() => {
		const trailers = trailerQuery.data?.results ?? [];

		return (
			trailers.find((t) => t.site === 'YouTube' && t.type === 'Trailer') ?? null
		);
	}, [trailerQuery.data]);

	const { ids: favIds, toggle } = useFavorites();
	const isFav = favIds ? favIds.includes(seriesId) : false;
  console.log('favIds', favIds);

	const openModal = () => {
		if (!trailer) return;
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="fade-in-top relative mx-auto h-full w-[336px] shrink-0 overflow-hidden rounded-3xl">
				{posterPath && (
					<>
						<img
							src={getTMDBImageUrl(posterPath, 'w92')}
							className="absolute inset-0 size-full scale-105 object-cover blur-lg transition-opacity duration-500"
						/>
						<img
							src={getTMDBImageUrl(posterPath, 'original')}
							onLoad={() => setHighResLoaded(true)}
							style={{ opacity: highResLoaded ? 1 : 0 }}
							className="relative z-10 size-full object-cover"
						/>

						<div className="absolute top-5 left-5 z-20 flex h-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-t from-black/70 to-black/30 px-3.5 backdrop-blur-sm">
							<TextFade className="text-[13px] leading-4 text-white">
								{status}
							</TextFade>
						</div>

						<button
							onClick={() => toggle.mutate(seriesId)}
							disabled={toggle.isPending}
							className="disabled:hover-100 absolute top-5 right-5 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-gradient-to-t from-black/70 to-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:backdrop-blur-md"
						>
							{isFav ? (
								<FaStar className="size-4" />
							) : (
								<FaRegStar className="size-4" />
							)}
						</button>

						{trailer && (
							<button
								onClick={openModal}
								className="fade-in-bottom group absolute bottom-0 left-0 z-20 h-1/3 w-full cursor-pointer"
							>
								<div className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3.5">
									<div className="flex size-[50px] items-center justify-center rounded-full border border-white/20 bg-gradient-to-t from-white/20 to-white/5 backdrop-blur-xl transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:backdrop-blur-md">
										<FaPlay className="-mr-0.5 size-5" />
									</div>
									<TextFade className="text-lg font-bold transition-transform duration-300 group-hover:translate-x-0.5">
										Play Trailer
									</TextFade>
								</div>

								<div className="blur-fade-xs absolute bottom-0 left-0 h-2/5 w-full" />
								<div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/85 to-black/0 transition-all duration-300 group-hover:h-[120%]" />
							</button>
						)}
					</>
				)}
			</div>

			<TrailerModal
				trailerKey={trailer?.key ?? ''}
				isOpen={isModalOpen}
				onClose={closeModal}
			/>
		</>
	);
};

export default Poster;
