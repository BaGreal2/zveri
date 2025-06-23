import Skeleton from '@/components/ui/skeleton';
import CarouselSkeleton from './components/carousel-skeleton';
import HeroSkeleton from './components/hero-skeleton';

const DiscoverSkeleton = () => {
	return (
		<div className="w-full overflow-x-hidden pb-[140px]">
			<div className="mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-visible pt-[165px]">
				<div className="flex flex-col items-center relative z-10">
					<Skeleton className="h-6 w-48 rounded-md" />
					<Skeleton className="mt-0.5 h-[52px] w-[600px] rounded-md backdrop-blur-xl" />
				</div>

				{/* Hero Carousel Section */}
				<HeroSkeleton />

				<div className="mb-4 flex flex-col items-center relative z-10">
					<Skeleton className="h-6 w-48 rounded-md" />
					<Skeleton className="mt-0.5 h-[52px] w-[400px] rounded-md backdrop-blur-md" />
				</div>

				{/* Category Sections */}
				<div className="flex w-full flex-col gap-10">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="relative flex flex-col gap-[18px] hover:z-10"
						>
							<div className="flex w-full items-center gap-[30px] px-[30px]">
								<Skeleton className="h-[20px] w-[160px] rounded-sm" />
								<div className="h-px grow bg-gradient-to-r from-transparent via-white/20 to-transparent" />
							</div>

							<CarouselSkeleton />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DiscoverSkeleton;
