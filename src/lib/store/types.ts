import type { User } from '@/types/auth';

export interface AuthState {
	user: User | null;
  token: string | null;
	setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}
