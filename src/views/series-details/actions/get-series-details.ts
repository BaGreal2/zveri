import { tmdbFetcher } from '@/lib/utils';

const getSeriesDetails = async (seriesId: string) => {
	const response = await tmdbFetcher(
		`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`
	);

	return response;
};

export default getSeriesDetails;
