import Skeleton from '@/components/ui/skeleton';

const ProfileSkeleton = () => (
	<div className="mx-auto flex w-full max-w-[1440px] flex-col pt-[309px]">
		<div className="pointer-events-none absolute top-0 left-0 z-0 h-screen w-full overflow-hidden">
			<div className="absolute top-0 left-0 z-0 h-4/5 w-full overflow-hidden">
				<Skeleton className="size-full" />
			</div>
			<div className="blur-fade absolute bottom-0 left-0 z-0 h-4/5 w-full" />
			<div className="absolute top-0 left-0 z-10 size-full bg-gradient-to-t from-black from-30% via-black/60 via-60% to-transparent" />
		</div>

		<div className="absolute top-[105px] left-1/2 z-10 -translate-x-1/2">
			<Skeleton className="h-4 w-32 rounded-xs" />
		</div>

		<div className="relative z-10">
			<div className="mb-[30px] flex gap-10">
				<Skeleton className="size-[200px] shrink-0 rounded-[30px]" />

				<div className="flex grow flex-col py-2.5">
					<Skeleton className="mb-2 h-8 w-60 rounded-xs" />
					<Skeleton className="mb-5 h-4 w-40 rounded-xs" />

					<div className="mb-2 flex flex-col gap-1">
						<Skeleton className="h-4 w-24 rounded-xs" />
						<Skeleton className="h-14 w-full max-w-[600px] rounded-md" />
					</div>
				</div>
			</div>

			<div className="mb-[30px] flex flex-col gap-2">
				<Skeleton className="h-4 w-28 rounded-xs" />
				<div className="flex gap-2">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="h-7 w-24 rounded-full" />
					))}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-24 rounded-xs" />
				<div className="flex gap-[18px]">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="h-96 w-64 rounded-2xl" />
					))}
				</div>
			</div>
		</div>
	</div>
);

export default ProfileSkeleton;
