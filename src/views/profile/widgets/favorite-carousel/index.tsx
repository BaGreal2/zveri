import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { useFavoritePosters } from '@/hooks/useFavoritePosters';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi
} from '@/components/ui/carousel';
import Skeleton from '@/components/ui/skeleton';
import TextFade from '@/components/ui/text-fade';

const wheelPlugin = WheelGesturesPlugin();

interface Props {
	ids: number[];
}

export default function FavoriteCarousel({ ids }: Props) {
	const { data: posters, isLoading } = useFavoritePosters(ids);
	const [api, setApi] = useState<CarouselApi>();
	const [showLeft, setShowLeft] = useState(false);
	const [showRight, setShowRight] = useState(false);

	/* update fades */
	useEffect(() => {
		if (!api) return;
		const update = () => {
			setShowLeft(api.canScrollPrev());
			setShowRight(api.canScrollNext());
		};
		update();
		api.on('select', update);
		api.on('reInit', update);
		return () => {
			api.off('select', update);
			api.off('reInit', update);
		};
	}, [api]);

	if (!ids.length)
		return (
			<TextFade className="text-white/65">No favorite series yet</TextFade>
		);

	return (
		<div className="relative">
			<Carousel
				opts={{ align: 'start', dragFree: true, loop: false }}
				setApi={setApi}
				plugins={[wheelPlugin]}
			>
				<CarouselContent className="mr-8 -ml-8">
					{isLoading
						? Array.from({ length: 4 }).map((_, i) => (
								<CarouselItem key={i} className="ml-[18px] basis-[300px]">
									<Skeleton className="h-96 w-64 rounded-2xl" />
								</CarouselItem>
							))
						: posters!.map(({ id, name, poster }) => (
								<CarouselItem
									key={id}
									className="ml-[18px] basis-64 transition-all duration-300"
								>
									<NavLink to={`/series/${id}`} key={id}>
										<img
											src={poster ?? ''}
											alt={name}
											className="h-96 w-64 rounded-2xl object-cover"
										/>
									</NavLink>
								</CarouselItem>
							))}
				</CarouselContent>
			</Carousel>

			{showRight && (
				<div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />
			)}
			{showLeft && (
				<div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
			)}
		</div>
	);
}
