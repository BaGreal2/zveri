import type { CSSProperties } from 'react';
import TextFade from '@/components/ui/text-fade';

interface Props {
	name: string;
	content: string;
	style?: CSSProperties;
}

const DetailBadge = ({ name, content, style }: Props) => {
	return (
		<div
			className="fade-in-top flex flex-col text-sm font-semibold opacity-0"
			style={style}
		>
			<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text leading-3.5 text-transparent capitalize">
				{name}:
			</span>
			<TextFade className="text-base leading-4">{content}</TextFade>
		</div>
	);
};

export default DetailBadge;
