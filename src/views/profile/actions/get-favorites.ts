import { fetcher } from '@/lib/utils';

const getFavorites = async () => {
	const response = await fetcher('/favorites');

	return response;
};

export default getFavorites;
