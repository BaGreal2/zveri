import Skeleton from '@/components/ui/skeleton';

interface Props {
	amount: number;
}

const EpisodesSkeletonRow = ({ amount }: Props) => {
	return Array.from({ length: amount ?? 10 }).map((_, i) => (
		<Skeleton
			key={i}
			className="flex shrink-0 h-10 w-14 items-center justify-center rounded-[10px] text-sm font-semibold text-white"
		/>
	));
};

export default EpisodesSkeletonRow;
