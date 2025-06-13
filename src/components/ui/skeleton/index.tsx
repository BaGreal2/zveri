import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const Skeleton = ({ className }: Props) => {
	return (
		<div
			className={cn(
				'size-full animate-pulse rounded-xl bg-white/15',
				className
			)}
		/>
	);
};

export default Skeleton;
