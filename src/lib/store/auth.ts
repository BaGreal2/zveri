import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthState } from './types';

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
);

export default useAuthStore;
