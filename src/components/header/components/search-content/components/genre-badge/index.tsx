import type { CSSProperties } from 'react';

interface Props {
	genre: string;
	style?: CSSProperties;
}

const GenreBadge = ({ genre, style }: Props) => {
	return (
		<div
			className="fade-in-top flex h-[28px] cursor-default items-center justify-center rounded-full border border-white/5 bg-gradient-to-t from-white/[0.08] to-white/5 px-3 opacity-0 backdrop-blur-sm"
			style={style}
		>
			<span className="text-[10px] leading-4 font-semibold text-nowrap text-white/80">
				{genre}
			</span>
		</div>
	);
};

export default GenreBadge;
