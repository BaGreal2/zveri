import { fetcher } from '@/lib/utils';

const getUser = async () => {
	const response = await fetcher('/me');

	return response;
};

export default getUser;
