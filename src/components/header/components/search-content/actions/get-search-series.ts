import { tmdbFetcher } from '@/lib/utils';
import type { Series, TMDBPaginatedResponse } from '@/types/tmdb';

const getSearchSeries = async (
	query: string,
	page: number = 1
): Promise<TMDBPaginatedResponse<Series>> => {
	const url = `https://api.themoviedb.org/3/search/tv?language=en-US&query=${encodeURIComponent(
		query
	)}&page=${page}`;
	const res = await tmdbFetcher(url);

	res.results.sort((a: Series, b: Series) => b.popularity - a.popularity);
	return res;
};

export default getSearchSeries;
