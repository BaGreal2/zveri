import { tmdbFetcher } from '@/lib/utils';
import type { TMDBPaginatedResponse, Trailer } from '@/types/tmdb';

const getSeriesTrailers = async (
	seriesId: string
): Promise<TMDBPaginatedResponse<Trailer>> => {
	const response = await tmdbFetcher(
		`https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`
	);

	return response;
};

export default getSeriesTrailers;
