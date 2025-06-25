import type { CSSProperties } from 'react';
import TextFade from '@/components/ui/text-fade';
import { cn } from '@/lib/utils';

interface Props {
	categoryName: string;
	title: string;
	className?: string;
	style?: CSSProperties;
}

const SectionTitle = ({ categoryName, title, className, style }: Props) => {
	return (
		<div className={cn('flex flex-col items-center', className)} style={style}>
			<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text text-2xl leading-6 font-bold text-transparent">
				{categoryName}
			</span>
			<TextFade className="-mt-0.5 text-5xl leading-[52px] font-bold">
				{title}
			</TextFade>
		</div>
	);
};

export default SectionTitle;
