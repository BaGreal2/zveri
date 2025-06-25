import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'file:text-foreground mt-2 flex h-16 w-full rounded-[20px] border border-white/15 bg-transparent px-5 py-1 text-base font-medium text-white/90 shadow-sm backdrop-blur-3xl transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-medium placeholder:text-white/65 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
