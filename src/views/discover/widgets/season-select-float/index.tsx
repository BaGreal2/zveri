import useSeasonsStore from '@/lib/store/seasons';
import { cn } from '@/lib/utils';
import type { Season } from '@/types/seasons';

const seasonsMap: Record<Season, string> = {
	spring: 'spring-icon.png',
	summer: 'summer-icon.png',
	autumn: 'autumn-icon.png',
	winter: 'winter-icon.png'
};

const SeasonSelectFloat = () => {
	const { currentSeason, setCurrentSeason } = useSeasonsStore();

	return (
		<div className="fixed right-[100px] bottom-[50px] z-50 flex w-[50px] flex-col items-center gap-[6.5px]">
			{Object.entries(seasonsMap).map(([season, icon]) => (
				<button
					className={cn(
						'group flex size-[35px] cursor-pointer items-center justify-center rounded-[14px] border border-white/10 bg-gradient-to-t from-white/15 to-white/5 opacity-50 shadow-[0_2px_1.4px_rgba(0,0,0,0.35)] backdrop-blur-3xl transition-all duration-300',
						currentSeason === season &&
							'size-[50px] rounded-[20px] border-white/15 opacity-100 shadow-[0_3px_2px_rgba(0,0,0,0.35)]'
					)}
					onClick={() => setCurrentSeason(season as Season)}
					key={season}
				>
					<img
						src={`/images/${icon}`}
						alt={`${season} icon`}
						className={cn(
							'size-[21px] transition-all duration-300',
							currentSeason === season && 'size-[30px]'
						)}
					/>
				</button>
			))}
		</div>
	);
};

export default SeasonSelectFloat;
