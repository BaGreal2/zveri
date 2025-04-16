import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthState } from './state';

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			setUser: (user) => set({ isAuthenticated: true, user }),
			removeUser: () => set({ isAuthenticated: false, user: null })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
);

export default useAuthStore;
