import { cn } from '@/lib/utils';

interface Props {
	isActive: boolean;
	leftImage?: string;
	rightImage?: string;
}

const OverlayCorners = ({ isActive, leftImage, rightImage }: Props) => {
	return (
		<div className="pointer-events-none fixed top-0 left-0 size-full">
			<div
				className={cn(
					'absolute bottom-0 left-0 size-[300px] -translate-x-full translate-y-full duration-300',
					isActive && 'translate-x-0 -translate-y-0'
				)}
			>
				{leftImage && (
					<img
						src={leftImage}
						className="size-full object-cover"
						alt="Winter Left"
					/>
				)}
			</div>
			<div
				className={cn(
					'absolute right-0 bottom-0 size-[300px] translate-x-full translate-y-full duration-300',
					isActive && 'translate-x-0 translate-y-0'
				)}
			>
				{rightImage && (
					<img
						src={rightImage}
						className="size-full object-cover"
						alt="Winter Left"
					/>
				)}
			</div>
		</div>
	);
};

export default OverlayCorners;
