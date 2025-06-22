import { tmdbFetcher } from '@/lib/utils';
import type { Series, TMDBPaginatedResponse } from '@/types/tmdb';

const getTopRatedSeries = async (
	page: number = 1
): Promise<TMDBPaginatedResponse<Series>> => {
	const url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
	const response = await tmdbFetcher(url);

	return response;
};

export default getTopRatedSeries;
