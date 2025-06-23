import CardSkeleton from '../card-skeleton';

const CarouselSkeleton = () => {
	return (
		<div className="flex gap-4 overflow-hidden px-[2px]">
			{Array.from({ length: 5 }).map((_, j) => (
				<CardSkeleton key={j} />
			))}
		</div>
	);
};

export default CarouselSkeleton;
