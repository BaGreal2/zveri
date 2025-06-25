import Skeleton from '@/components/ui/skeleton';

const SkeletonDetailBadges = () => {
	return (
		<div className="flex">
			{Array.from({ length: 3 }).map((_, i) => (
				<div key={i} className="mr-10 flex flex-col text-sm font-semibold">
					<Skeleton className="mb-1 h-[10px] w-[50px] rounded-sm bg-white/15" />
					<Skeleton className="h-[14px] w-[60px] rounded-sm bg-white/25" />
				</div>
			))}
		</div>
	);
};

export default SkeletonDetailBadges;
