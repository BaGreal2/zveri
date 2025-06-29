import Skeleton from '@/components/ui/skeleton';
import EpisodesSkeletonRow from '../../components/episodes-skeleton-row';

const SeriesDetailsSkeleton = () => (
	<div className="bg-black pt-[155px]">
		<div className="pointer-events-none absolute top-0 left-0 z-0 h-screen w-full overflow-hidden">
			<div className="absolute top-0 left-0 z-0 h-4/5 w-full overflow-hidden">
				<Skeleton className="size-full" />
			</div>
			<div className="blur-fade absolute bottom-0 left-0 z-0 h-4/5 w-full" />
			<div className="absolute top-0 left-0 z-10 size-full bg-gradient-to-t from-black from-30% via-black/60 via-60% to-transparent" />
		</div>

		<div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center rounded-md px-4 py-5 shadow-lg">
			<div className="flex h-[510px] w-full items-end gap-16">
				<div className="relative h-full w-[336px] shrink-0 overflow-hidden rounded-3xl">
					<Skeleton className="size-full" />
				</div>

				<div className="flex grow flex-col">
					<div className="mb-5 flex gap-2">
						<Skeleton className="h-10 w-24 rounded-full" />
						<Skeleton className="h-10 w-24 rounded-full" />
					</div>
					<Skeleton className="mb-5 h-8 w-full max-w-[600px]" />
					<div className="mb-10 flex gap-8">
						<Skeleton className="h-10 w-44" />
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-48" />
					</div>
					<div className="mb-7 flex max-w-[840px] flex-col gap-2.5">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-18 w-full" />
					</div>
				</div>
			</div>

			<div className="mt-[30px] ml-0.5 flex gap-3.5">
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton key={i} className="h-[155px] w-[250px] rounded-[30px]" />
				))}
			</div>

			<div className="mt-[35px] max-w-full rounded-[34px] border border-white/15 bg-gradient-to-t from-white/10 to-white/5 p-10 backdrop-blur-md">
				<div className="flex min-w-[720px] flex-col gap-2 overflow-hidden">
					{/* episode-numbers row */}
					<div className="flex h-10 items-center gap-2.5">
						<div className="w-[90px] shrink-0">
							<Skeleton className="h-[15px] w-[70px] rounded-xs" />
						</div>
						<div className="flex gap-2">
							{Array.from({ length: 20 }).map((_, i) => (
								<Skeleton key={i} className="h-[15px] w-14 rounded-xs" />
							))}
						</div>
					</div>

					{/* a few season rows */}
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2.5">
							<div className="flex h-10 w-[90px] shrink-0 items-center">
								<Skeleton className="h-[15px] w-[70px] rounded-xs" />
							</div>
							<div className="flex gap-2">
								<EpisodesSkeletonRow amount={20} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

export default SeriesDetailsSkeleton;
