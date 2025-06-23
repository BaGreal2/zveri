import Skeleton from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const HeroSkeleton = ({ className }: Props) => {
	return (
		<div className={cn('-mt-2 mb-[50px] w-full', className)}>
			<div className="relative aspect-[244/100] w-full rounded-4xl">
				<Skeleton className="size-full rounded-4xl" />
				<Skeleton className="absolute top-1/2 left-0 z-10 h-[74.8%] w-[108px] -translate-x-full -translate-y-1/2 rounded-l-4xl rounded-r-none bg-gradient-to-l from-white/10 to-white/15" />
				<Skeleton className="absolute top-1/2 right-0 z-10 h-[74.8%] w-[108px] translate-x-full -translate-y-1/2 rounded-l-none rounded-r-4xl bg-gradient-to-r from-white/10 to-white/15" />
			</div>

			<div className="mt-[25px] flex justify-center gap-[6px]">
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton key={i} className="h-[5px] w-[50px] rounded-full" />
				))}
			</div>
		</div>
	);
};

export default HeroSkeleton;
