import type { CSSProperties } from 'react';
import TextFade from '@/components/ui/text-fade';
import { cn } from '@/lib/utils';

interface Props {
	name: string;
	content: string;
	className?: string;
	style?: CSSProperties;
}

const DetailBadge = ({ name, content, className, style }: Props) => {
	return (
		<div
			className={cn('mr-10 flex flex-col text-sm font-semibold', className)}
			style={style}
		>
			<span className="bg-gradient-to-t from-[#71C1FF] text-start to-[#A2D8FF] to-70% bg-clip-text text-xs leading-3 text-transparent capitalize">
				{name}:
			</span>
			<TextFade className="text-sm leading-3.5 text-start">{content}</TextFade>
		</div>
	);
};

export default DetailBadge;
