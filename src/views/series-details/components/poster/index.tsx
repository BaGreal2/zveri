import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaPlay, FaRegStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import TextFade from '@/components/ui/text-fade';
import { modalRoot } from '@/lib/roots';
import { cn, getTMDBImageUrl } from '@/lib/utils';
import getSeriesTrailer from '../../actions/get-series-trailer';

interface Trailer {
	key: string;
	site: string;
	type: string;
}

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
	const [showModal, setShowModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const trailer = useMemo(() => {
		const trailers = trailerQuery.data?.results ?? [];

		return (
			trailers.find(
				(t: Trailer) => t.site === 'YouTube' && t.type === 'Trailer'
			) ?? null
		);
	}, [trailerQuery.data]);

	const openModal = () => {
		if (!trailer) return;
		setShowModal(true);
		requestAnimationFrame(() => setIsOpen(true));
	};

	const closeModal = () => {
		setIsOpen(false);
		setTimeout(() => setShowModal(false), 300);
	};

	return (
		<>
			<div className="fade-in-top relative h-full w-[336px] shrink-0 overflow-hidden rounded-3xl">
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

						<button className="absolute top-5 right-5 z-20 flex size-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-t from-black/70 to-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:backdrop-blur-md">
							<FaRegStar className="size-4" />
						</button>

						{trailer && (
							<button
								onClick={openModal}
								className="group absolute bottom-0 left-0 z-20 h-1/3 w-full cursor-pointer"
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

			{showModal &&
				modalRoot &&
				createPortal(
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<button
							onClick={closeModal}
							className={cn(
								'absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300',
								isOpen ? 'opacity-100' : 'opacity-0'
							)}
						/>

						<div
							className={cn(
								'relative z-10 aspect-video w-[min(90%,1300px)] overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300',
								isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
							)}
						>
							<iframe
								src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&controls=1&rel=0`}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="h-full w-full"
								title="Trailer"
							/>
						</div>
					</div>,
					modalRoot
				)}
		</>
	);
};

export default Poster;
