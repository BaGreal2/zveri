import { fetcher } from '@/lib/utils';

const getAiringSeries = async (page: number = 1) => {
	const url = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`;
	const response = await fetcher(url);

	return response;
};

export default getAiringSeries;
