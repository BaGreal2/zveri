import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { QueryFunctionContext } from '@tanstack/react-query';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { getTvSeriesByCategory } from '../../actions/get-by-category-series';
import type { TvCategory } from '../../types/tv-category';
import CarouselSkeleton from '../../widgets/skeleton/components/carousel-skeleton';
import SeriesCard from '../series-card';

const wheelPlugin = WheelGesturesPlugin();

interface Props {
	category: TvCategory;
}

const SeriesPreviewCarousel = ({ category }: Props) => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoverCardHovered, setHoverCardHovered] = useState(false);

	const [carouselApi, setCarouselApi] = useState<CarouselApi>();
	const [showLeftFade, setShowLeftFade] = useState(false);
	const [showRightFade, setShowRightFade] = useState(false);

	const rowHovered = isHovered || hoverCardHovered;

	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ['tv-row', category],
		queryFn: ({ signal }: QueryFunctionContext) =>
			getTvSeriesByCategory(category, 1, signal as AbortSignal),
    staleTime: 1000 * 60 * 5,
	});

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

	if (isLoading || isFetching || !data) {
		return <CarouselSkeleton />;
	}

	if (isError) return null;

	return (
		<div className="relative">
			<Carousel
				opts={{ align: 'start', dragFree: true, loop: false }}
				setApi={setCarouselApi}
				plugins={[wheelPlugin]}
			>
				<CarouselContent
					onPointerEnter={() => setIsHovered(true)}
					onPointerLeave={() => setIsHovered(false)}
					className="mr-8 -ml-8"
					containerClassName="overflow-x-clip overflow-y-visible"
				>
					{data.results.map((series, i) => (
						<CarouselItem
							key={series.id}
							className="group relative ml-[18px] basis-[300px] hover:z-10"
						>
							<SeriesCard
								series={series}
								setHoverCardHovered={setHoverCardHovered}
								rowHovered={rowHovered}
								className="fade-in-top opacity-0"
								style={{ animationDelay: `${i * 100}ms` }}
							/>
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

export default SeriesPreviewCarousel;
