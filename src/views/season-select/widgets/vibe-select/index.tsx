import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import Vibe from '../../components/vibe';

interface Props {
	className?: string;
	style?: CSSProperties;
}

const VibeSelect = ({ className, style }: Props) => {
	return (
		<div
			className={cn('flex h-[512px] w-full gap-[10.5px]', className)}
			style={style}
		>
			<Vibe
				value="winter"
				imageSrc="/images/winter-vibe-bg.png"
				label="Winter"
			/>
			<Vibe
				value="spring"
				imageSrc="/images/spring-vibe-bg.png"
				label="Spring"
			/>
			<Vibe
				value="summer"
				imageSrc="/images/summer-vibe-bg.png"
				label="Summer"
			/>
			<Vibe value="autumn" imageSrc="/images/fall-vibe-bg.png" label="Autumn" />
		</div>
	);
};

export default VibeSelect;
