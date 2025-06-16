import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthState } from './types';

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			setUser: (user) => set({ user }),
			setToken: (token) => set({ token })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useAuthStore;
