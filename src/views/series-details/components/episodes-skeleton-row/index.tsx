import Skeleton from '@/components/ui/skeleton';

interface Props {
	amount: number;
}

const EpisodesSkeletonRow = ({ amount }: Props) => {
	return Array.from({ length: amount ?? 10 }).map((_, i) => (
		<Skeleton
			key={i}
			className="flex size-10 items-center justify-center rounded-lg text-sm font-semibold text-white"
		/>
	));
};

export default EpisodesSkeletonRow;
