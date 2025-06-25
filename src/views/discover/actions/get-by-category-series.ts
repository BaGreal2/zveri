import { tmdbFetcher } from '@/lib/utils';
import type { Series, TMDBPaginatedResponse } from '@/types/tmdb';

type DiscoverConfig =
	| { sort_by: string; voteCount?: number; dateRange?: number }
	| { airDate: 'today' | 'month' };

const sortMap: Record<string, DiscoverConfig> = {
	trending_day: { sort_by: 'popularity.desc', dateRange: 1 },
	trending_week: { sort_by: 'popularity.desc', dateRange: 7 },
	top_rated: { sort_by: 'vote_average.desc', voteCount: 100 },
	popular: { sort_by: 'popularity.desc' },
	airing_today: { airDate: 'today' },
	on_the_air: { airDate: 'month' }
};

const getTvSeriesByCategory = async (
	category: keyof typeof sortMap,
	page: number = 1,
	genreIds: number[] = [],
	signal?: AbortSignal
): Promise<TMDBPaginatedResponse<Series>> => {
	const base = 'https://api.themoviedb.org/3/discover/tv';
	const url = new URL(base);

	url.searchParams.set('page', page.toString());
	url.searchParams.set('language', 'en-US');
	url.searchParams.set('include_null_first_air_dates', 'false');

	const config = sortMap[category];

	if ('sort_by' in config) {
		url.searchParams.set('sort_by', config.sort_by);
		if (config.voteCount) {
			url.searchParams.set('vote_count.gte', config.voteCount.toString());
		}
		if (config.dateRange) {
			const now = new Date();
			const from = new Date(now);
			from.setDate(now.getDate() - config.dateRange);
			url.searchParams.set(
				'first_air_date.gte',
				from.toISOString().split('T')[0]
			);
		}
	}

	if ('airDate' in config) {
		const today = new Date();
		const todayStr = today.toISOString().split('T')[0];
		if (config.airDate === 'today') {
			url.searchParams.set('air_date.gte', todayStr);
			url.searchParams.set('air_date.lte', todayStr);
		} else {
			const from = new Date(today);
			from.setDate(today.getDate() - 30);
			url.searchParams.set('air_date.gte', from.toISOString().split('T')[0]);
			url.searchParams.set('air_date.lte', todayStr);
		}
	}

	if (genreIds.length > 0) {
		url.searchParams.set('with_genres', genreIds.join('|'));
	}

	return tmdbFetcher(url.toString(), { signal } as RequestInit);
};

export default getTvSeriesByCategory;
