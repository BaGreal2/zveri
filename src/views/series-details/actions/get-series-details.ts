import { fetcher } from '@/lib/utils';

const getSeriesDetails = async (seriesId: string) => {
	const url = `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`;

	const response = await fetcher(url);

	return response;
};

export default getSeriesDetails;
