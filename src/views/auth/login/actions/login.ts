import { fetcher } from '@/lib/utils';
import type { LoginFormData } from '..';

const login = async (userData: LoginFormData) => {
	const response = await fetcher('/login', {
		method: 'POST',
		body: JSON.stringify(userData)
	});

	return response;
};

export default login;
