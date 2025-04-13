import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState } from './state';

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			login: (user) => set({ isAuthenticated: true, user }),
			logout: () => set({ isAuthenticated: false, user: null })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
);

export default useAuthStore;
