import Skeleton from '@/components/ui/skeleton';

const SkeletonResults = () => {
	return (
		<div className="flex w-full flex-col">
			<div className="mb-[22px] pl-5">
				<Skeleton className="h-[20px] w-[130px] rounded-md backdrop-blur-md" />
			</div>
			<div className="flex h-[63.5vh] w-full flex-col gap-2.5 overflow-hidden">
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton
						key={i}
						className="h-[224px] w-full shrink-0 rounded-[18px] backdrop-blur-md"
					/>
				))}
			</div>
		</div>
	);
};

export default SkeletonResults;
