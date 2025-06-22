import { useQuery } from '@tanstack/react-query';
import type { QueryFunctionContext } from '@tanstack/react-query';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel';
import { getTvSeriesByCategory } from '../actions/get-by-category-series';
import type { TvCategory } from '../types/tv-category';
import SeriesCard from './series-card';

const wheelPlugin = WheelGesturesPlugin();

interface Props {
	category: TvCategory;
}

const SeriesPreviewCarousel = ({ category }: Props) => {
	const { data, isFetching, isError } = useQuery({
		queryKey: ['tv-row', category],
		queryFn: ({ signal }: QueryFunctionContext) =>
			getTvSeriesByCategory(category, 1, signal as AbortSignal)
	});

	if (isFetching || isError) return null;

	return (
		<Carousel
			opts={{ align: 'start', dragFree: true, loop: false }}
			plugins={[wheelPlugin]}
		>
			<CarouselContent className="group/row mr-8 -ml-8" containerClassName="overflow-x-clip overflow-y-visible">
				{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
				{data.results.map((series: any) => (
					<CarouselItem
						key={series.id}
						className="group relative ml-[18px] basis-[300px] hover:z-10"
					>
						<SeriesCard series={series} />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export default SeriesPreviewCarousel;
