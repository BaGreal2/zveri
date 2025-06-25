import { type CSSProperties } from 'react';
import useSeasonsStore from '@/lib/store/seasons';
import { cn } from '@/lib/utils';
import type { Season } from '@/types/seasons';
import OverlayCorners from '../../components/overlay-corners';
import Vibe from '../../components/vibe';
import vibePropertiesMap from '../../data/vibe-properties';

interface Props {
	className?: string;
	style?: CSSProperties;
}

const VibeSelect = ({ className, style }: Props) => {
	const { currentSeason } = useSeasonsStore();

	return (
		<>
			<div
				className={cn('flex h-[450px] w-full gap-[32px]', className)}
				style={style}
			>
				{Object.entries(vibePropertiesMap).map(
					([key, { label, mainImage }]) => (
						<Vibe
							key={key}
							value={key as Season}
							imageSrc={mainImage}
							label={label}
						/>
					)
				)}
			</div>
			{Object.entries(vibePropertiesMap).map(
				([key, { leftImage, rightImage }]) => {
					return (
						<OverlayCorners
							key={key}
							isActive={currentSeason === key}
							leftImage={leftImage}
							rightImage={rightImage}
						/>
					);
				}
			)}
		</>
	);
};

export default VibeSelect;
