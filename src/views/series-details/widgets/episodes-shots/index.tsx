import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import Skeleton from '@/components/ui/skeleton';
import { modalRoot } from '@/lib/roots';
import { cn, getTMDBImageUrl } from '@/lib/utils';
import EpisodeShot from '../../components/episode-shot';
import useEpisodes from '../../hooks/useEpisodes';

interface Props {
	seriesId: string;
	numberOfEpisodes: number;
}

const EpisodesShots = ({ seriesId, numberOfEpisodes }: Props) => {
	const episodesQueries = useEpisodes(
		seriesId,
		1,
		Math.min(numberOfEpisodes || 0, 32)
	);

	const [carouselApi, setCarouselApi] = useState<CarouselApi>();
	const [showLeftFade, setShowLeftFade] = useState(false);
	const [showRightFade, setShowRightFade] = useState(false);

	const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

	const [showModal, setShowModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setShowModal(true);
		requestAnimationFrame(() => setIsOpen(true));
	};

	const closeModal = () => {
		setIsOpen(false);
		setTimeout(() => setShowModal(false), 300);
	};

	const handleClick = (index: number) => {
		setSelectedEpisode(index);
		openModal();
	};

	useEffect(() => {
		if (!carouselApi) return;

		const updateFade = () => {
			setShowLeftFade(carouselApi.canScrollPrev());
			setShowRightFade(carouselApi.canScrollNext());
		};

		updateFade();

		carouselApi.on('select', updateFade);
		carouselApi.on('reInit', updateFade);

		return () => {
			carouselApi?.off('select', updateFade);
			carouselApi?.off('reInit', updateFade);
		};
	}, [carouselApi]);

	const handlePrevSelect = () => {
		if (selectedEpisode === null) return;
		const prevIndex = selectedEpisode - 1;
		if (prevIndex < 0 || !episodesQueries[prevIndex]?.data) return;
		handleClick(prevIndex);
	};

	const handleNextSelect = () => {
		if (selectedEpisode === null) return;
		const nextIndex = selectedEpisode + 1;
		if (!episodesQueries[nextIndex]?.data) return;
		handleClick(nextIndex);
	};

	const stillPath =
		selectedEpisode !== null &&
		episodesQueries[selectedEpisode]?.data?.still_path;
	const name =
		selectedEpisode !== null && episodesQueries[selectedEpisode]?.data?.name
			? episodesQueries[selectedEpisode].data.name
			: `Episode ${selectedEpisode !== null ? selectedEpisode + 1 : ''}`;

	return (
		<div className="relative">
			<Carousel
				opts={{ skipSnaps: true }}
				setApi={setCarouselApi}
				plugins={[WheelGesturesPlugin()]}
			>
				<CarouselContent className="mr-7 -ml-7 pt-[30px]">
					{episodesQueries.map((q, i) => (
						<CarouselItem key={i} className="ml-3.5 basis-[250px]">
							{q.isLoading || !q.data ? (
								<Skeleton className="h-[155px] w-[250px] rounded-[30px]" />
							) : (
								<EpisodeShot
									name={q.data.name || `Episode ${i + 1}`}
									stillPath={q.data.still_path}
									onClick={() => handleClick(i)}
									style={{ animationDelay: `${i * 100}ms` }}
								/>
							)}
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{showRightFade && (
				<div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />
			)}
			{showLeftFade && (
				<div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
			)}

			{showModal &&
				modalRoot &&
				createPortal(
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<button
							className={cn(
								'absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300',
								isOpen ? 'opacity-100' : 'opacity-0'
							)}
							onClick={closeModal}
						/>

						<div
							className="relative z-20 flex items-center gap-6"
							onClick={closeModal}
						>
							<button
								className={cn(
									'flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-gradient-to-t from-white/25 to-white/10 px-5 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:backdrop-blur-md',
									isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
									selectedEpisode === 0 && 'scale-90 opacity-0'
								)}
								disabled={selectedEpisode === 0}
								onClick={(e) => {
									e.stopPropagation();
									handlePrevSelect();
								}}
							>
								<FaArrowLeft className="size-5" />
							</button>
							<img
								src={getTMDBImageUrl(stillPath, 'original')}
								alt={name}
								onClick={closeModal}
								className={cn(
									'relative z-10 w-full max-w-[70vw] rounded-3xl object-cover shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300',
									isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
								)}
							/>
							<button
								className={cn(
									'flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-gradient-to-t from-white/25 to-white/10 px-5 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:backdrop-blur-md',
									isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
									selectedEpisode === episodesQueries.length - 1 &&
										'scale-90 opacity-0'
								)}
								disabled={selectedEpisode === episodesQueries.length - 1}
								onClick={(e) => {
									e.stopPropagation();
									handleNextSelect();
								}}
							>
								<FaArrowRight className="size-5" />
							</button>
						</div>
					</div>,
					modalRoot
				)}
		</div>
	);
};

export default EpisodesShots;
