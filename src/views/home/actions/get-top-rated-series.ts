import { fetcher } from '@/lib/utils';

const getTopRatedSeries = async (page: number = 1) => {
	const response = await fetcher(`/series/top_rated?page=${page}`);

	return response;
};

export default getTopRatedSeries;
