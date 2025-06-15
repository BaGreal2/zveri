import { useEffect, useState } from 'react';
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import Skeleton from '@/components/ui/skeleton';
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

	return (
		<div className="relative">
			<Carousel opts={{ skipSnaps: true }} setApi={setCarouselApi}>
				<CarouselContent className="mr-7 -ml-7 pt-[30px]">
					{episodesQueries.map((q, i) => (
						<CarouselItem key={i} className="ml-3.5 basis-[250px]">
							{q.isLoading || !q.data ? (
								<Skeleton className="h-[155px] w-[250px] rounded-[30px]" />
							) : (
								<EpisodeShot
									name={q.data.name || `Episode ${i + 1}`}
									stillPath={q.data.still_path}
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
		</div>
	);
};

export default EpisodesShots;
