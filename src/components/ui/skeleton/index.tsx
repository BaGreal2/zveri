import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const Skeleton = ({ className }: Props) => {
	return (
		<div
			className={cn(
				'size-full animate-pulse rounded-xl bg-gray-800',
				className
			)}
		/>
	);
};

export default Skeleton;
