import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SeasonsState } from './types';

const useSeasonsStore = create<SeasonsState>()(
	persist(
		(set) => ({
			currentSeasons: null,
			setCurrentSeason: (season) => set({ currentSeasons: season })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useSeasonsStore;
