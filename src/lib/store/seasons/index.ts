import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SeasonsState } from './types';

const useSeasonsStore = create<SeasonsState>()(
	persist(
		(set) => ({
			currentSeason: null,
			lastTimeSelected: null,
			setCurrentSeason: (season) => set({ currentSeason: season }),
			setLastTimeSelected: (time) => set({ lastTimeSelected: time })
		}),
		{
			name: 'seasons-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useSeasonsStore;
