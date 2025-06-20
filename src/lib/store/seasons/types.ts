import type { Season } from '@/types/seasons';

export interface SeasonsState {
	currentSeasons: Season | null;
	setCurrentSeason: (season: Season | null) => void;
}
