import type { CSSProperties } from 'react';
import { format } from 'date-fns';
import getFlagImageUrl from '@/views/series-details/utils/get-flag-image-url';
import TextFade from '@/components/ui/text-fade';
import { cn } from '@/lib/utils';

interface Props {
	name: string;
	countryCode: string;
	firstAirDate?: string;
	className?: string;
	style?: CSSProperties;
}

const Title = ({
	name,
	countryCode,
	firstAirDate,
	className,
	style
}: Props) => {
	return (
		<h1
			className={cn(
				'fade-in-top mb-5 flex items-center gap-2 text-[20px] leading-[20px] font-bold opacity-0',
				className
			)}
			style={style}
		>
			{countryCode && (
				<img
					src={getFlagImageUrl(countryCode)}
					alt={`${countryCode} flag`}
					className="inline-block w-[19px] rounded-xs"
				/>
			)}
			<TextFade>{name}</TextFade>
			{firstAirDate && (
				<span className="font-normal text-white/65">
					({format(firstAirDate, 'yyyy')})
				</span>
			)}
		</h1>
	);
};

export default Title;
