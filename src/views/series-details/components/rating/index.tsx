import StarEmptyIcon from '@/icons/star-empty.svg?react';
import StarFillIcon from '@/icons/star-fill.svg?react';
import TextFade from '@/components/ui/text-fade';
import { cn } from '@/lib/utils';

interface Props {
	rating: number;
	voteCount: number;
	className?: string;
}

const Rating = ({ rating, voteCount, className }: Props) => {
	const normalizedRating = Math.min(rating / 2, 5);

	return (
		<div className={cn('fade-in-top flex items-center gap-3.5', className)}>
			<TextFade className="text-[32px] leading-[32px] font-bold">
				{rating.toFixed(1)}
			</TextFade>
			<div className="flex flex-col gap-1">
				<span className="relative">
					<span
						className="absolute top-0 left-0 overflow-hidden"
						style={{ width: `${(normalizedRating / 5) * 100}%` }}
					>
						<span className="relative top-0 left-0 flex gap-1.5 text-[#FFD823]">
							{Array.from({ length: 5 }).map((_, i) => (
								<StarFillIcon key={i} className="size-5 shrink-0" />
							))}
						</span>
					</span>
					<span className="relative z-0 flex gap-1.5 text-[#FFD823]">
						{Array.from({ length: 5 }).map((_, i) => (
							<StarEmptyIcon key={i} className="size-5" />
						))}
					</span>
				</span>
				<TextFade className="text-[13px] leading-[13px] font-semibold">
					{voteCount.toLocaleString()}
				</TextFade>
			</div>
		</div>
	);
};

export default Rating;
