import { tmdbFetcher } from '@/lib/utils';

const getSeriesTrailers = async (seriesId: string) => {
	const response = await tmdbFetcher(
		`https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`
	);

	return response;
};

export default getSeriesTrailers;
