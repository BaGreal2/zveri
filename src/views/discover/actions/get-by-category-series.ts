import { tmdbFetcher } from '@/lib/utils';
import type { Series, TMDBPaginatedResponse } from '@/types/tmdb';
import tvEndpoints from '../data/tv-endpoints';
import type { TvCategory } from '../types/tv-category';

export const getTvSeriesByCategory = async (
	category: TvCategory,
	page: number = 1,
	signal?: AbortSignal
): Promise<TMDBPaginatedResponse<Series>> => {
	const paging = category.startsWith('trending') ? '' : `?page=${page}`;

	const url = `https://api.themoviedb.org/3/${tvEndpoints[category]}${paging}`;

	return tmdbFetcher(url, { signal } as RequestInit);
};
