import type { Season } from '@/types/seasons';

export interface SeasonsState {
	currentSeason: Season | null;
	setCurrentSeason: (season: Season | null) => void;
	lastTimeSelected: string | null;
	setLastTimeSelected: (time: string | null) => void;
}
