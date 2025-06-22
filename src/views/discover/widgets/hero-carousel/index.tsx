import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import getDiscoverSeries from '../../actions/get-discover-series';
import SeriesBanner from '../../components/series-banner';
import HeroSkeleton from '../skeleton/components/hero-skeleton';

const HeroCarousel = () => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	const discoverQuery = useInfiniteQuery({
		queryKey: ['discover-series'],
		queryFn: ({ pageParam = 1 }) => getDiscoverSeries(pageParam),
		initialPageParam: 1,
		getNextPageParam: (last) =>
			last.page < last.total_pages ? last.page + 1 : undefined,
		staleTime: 1000 * 60 * 5
	});

	const topSeries =
		discoverQuery.data?.pages.flatMap((p) => p.results).slice(0, 5) ?? [];

	useEffect(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
		api.on('select', () => setCurrent(api.selectedScrollSnap()));
	}, [api]);

	if (discoverQuery.isFetching || discoverQuery.isLoading) {
		return <HeroSkeleton className="-mt-6" />;
	}

	const len = topSeries.length;
	const prev = (current - 1 + len) % len;
	const next = (current + 1) % len;

	return (
		<div
			className="fade-in-top -mt-6 mb-[50px] w-full opacity-0"
			style={{ animationDelay: '150ms' }}
		>
			<div className="relative">
				<Carousel
					setApi={setApi}
					opts={{
						loop: true,
						align: 'center',
						containScroll: 'keepSnaps',
						skipSnaps: false
					}}
				>
					<CarouselContent containerClassName="overflow-visible">
						{topSeries.map((series, i) => {
							const isCurr = i === current;
							const isPrev = i === prev;
							const isNext = i === next;

							return (
								<CarouselItem
									key={i}
									className={cn(
										'flex-none basis-full transition-transform duration-300',
										isCurr && 'z-20 scale-100 opacity-100',
										(isPrev || isNext) && 'z-10 scale-75 opacity-40',
										isPrev && 'translate-x-[80%]',
										isNext && '-translate-x-[80%]',
										!isCurr && !isPrev && !isNext && 'invisible'
									)}
								>
									<SeriesBanner series={series} />
								</CarouselItem>
							);
						})}
					</CarouselContent>

					<CarouselPrevious className="left-0 -translate-x-1/2" />
					<CarouselNext className="right-0 translate-x-1/2" />
				</Carousel>
				<div className="mt-[25px] flex justify-center gap-[6px]">
					{topSeries.map((_, i) => (
						<span
							key={i}
							className={cn(
								'h-[5px] w-[50px] rounded-full bg-white/15 transition-all duration-300',
								current === i && 'bg-white'
							)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HeroCarousel;
