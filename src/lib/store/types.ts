import type { User } from '@/types/auth';

export interface AuthState {
	user: User | null;
	setUser: (user: User | null) => void;
}
