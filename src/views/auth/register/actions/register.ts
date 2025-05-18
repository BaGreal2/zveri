import { fetcher } from '@/lib/utils';
import type { RegisterFormData } from '..';

const register = async (userData: RegisterFormData) => {
	const response = await fetcher('/register', {
		method: 'POST',
		body: JSON.stringify(userData)
	});

	return response;
};

export default register;
