import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}

const TextFade = ({ children, className, style }: Props) => {
	return (
		<span
			className={cn(
				'bg-gradient-to-t from-white/65 to-white to-70% bg-clip-text text-transparent',
				className
			)}
			style={style}
		>
			{children}
		</span>
	);
};

export default TextFade;
