import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
	children: ReactNode;
	className?: string;
}

const TextFade = ({ children, className }: Props) => {
	return (
		<span
			className={cn(
				'bg-gradient-to-t from-white/65 to-white to-70% bg-clip-text text-transparent',
				className
			)}
		>
			{children}
		</span>
	);
};

export default TextFade;
