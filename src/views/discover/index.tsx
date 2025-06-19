'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import TextFade from '@/components/ui/text-fade';
import { cn } from '@/lib/utils';
import getDiscoverSeries from './actions/get-discover-series';
import SeriesBanner from './components/series-banner';

const wheelPlugin = WheelGesturesPlugin();

const Discover = () => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	const discoverQuery = useInfiniteQuery({
		queryKey: ['discover-series'],
		queryFn: ({ pageParam = 1 }) => getDiscoverSeries(pageParam),
		initialPageParam: 1,
		getNextPageParam: (last) =>
			last.page < last.total_pages ? last.page + 1 : undefined
	});

	const topSeries =
		discoverQuery.data?.pages.flatMap((p) => p.results).slice(0, 5) ?? [];

	useEffect(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
		api.on('select', () => setCurrent(api.selectedScrollSnap()));
	}, [api]);

	const len = topSeries.length;
	const prev = (current - 1 + len) % len;
	const next = (current + 1) % len;

	return (
		<div className="w-full overflow-x-hidden">
			<div className="mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-visible pt-[165px]">
				<div className="relative z-10 flex flex-col items-center">
					<span className="fade-in-top bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text text-2xl leading-[24px] font-bold text-transparent">
						Popular Series
					</span>
					<TextFade className="fade-in-top -mt-0.5 text-5xl leading-[52px] font-bold">
						Top now in your region
					</TextFade>
				</div>

				<div
					className="fade-in-top -mt-6 w-full opacity-0"
					style={{ animationDelay: '150ms' }}
				>
					<div className="relative">
						<Carousel
							setApi={setApi}
							plugins={[wheelPlugin]}
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
			</div>
		</div>
	);
};

export default Discover;
