import type { User } from '@/types/auth';

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	setUser: (user: User) => void;
	removeUser: () => void;
}
