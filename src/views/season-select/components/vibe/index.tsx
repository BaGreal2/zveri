import { useNavigate } from 'react-router';
import TextFade from '@/components/ui/text-fade';
import useSeasonsStore from '@/lib/store/seasons';
import { cn } from '@/lib/utils';
import type { Season } from '@/types/seasons';

interface Props {
	imageSrc: string;
	label: string;
	value: Season;
}

const Vibe = ({ imageSrc, label, value }: Props) => {
	const navigate = useNavigate();
	const { currentSeason, setLastTimeSelected, setCurrentSeason } =
		useSeasonsStore();

	const onVibeClick = () => {
		setLastTimeSelected(new Date().toISOString());
		navigate('/discover');
	};

	return (
		<button
			onClick={onVibeClick}
			className={cn(
				'group relative h-full grow cursor-pointer transition-all duration-200 ease-in hover:translate-y-[20px]',
				currentSeason !== null && currentSeason !== value && 'opacity-20'
			)}
			onMouseEnter={() => setCurrentSeason(value)}
			onMouseLeave={() => setCurrentSeason(null)}
		>
			<div className="size-full overflow-hidden rounded-[30px] border-2 border-white/15 backdrop-blur-md transition-all duration-200 ease-in hover:border-white/65">
				<img
					src={imageSrc}
					className="size-full object-cover opacity-70 transition-all duration-200 ease-in group-hover:opacity-100"
					alt={`${label} Vibe`}
				/>
			</div>
			<div className="absolute bottom-0 left-1/2 flex h-10 -translate-x-1/2 translate-y-[70%] cursor-default items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-[#363636] via-20% to-black/10 px-5 opacity-0 backdrop-blur-3xl transition-all duration-200 ease-in group-hover:translate-y-1/2 group-hover:opacity-100 hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:backdrop-blur-md">
				<TextFade className="text-[13px] leading-4 font-semibold">
					{label}
				</TextFade>
			</div>
		</button>
	);
};

export default Vibe;
