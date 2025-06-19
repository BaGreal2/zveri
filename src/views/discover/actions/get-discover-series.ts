import { tmdbFetcher } from '@/lib/utils';

const sortValueMap = {
	popularity: 'popularity.desc',
	vote_average: 'vote_average.desc'
};

const getDiscoverSeries = async (
	page: number = 1,
	sort: keyof typeof sortValueMap = 'vote_average'
) => {
	const url = `https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sortValueMap[sort]}&vote_count.gte=100`;
	const response = await tmdbFetcher(url);

	return response;
};

export default getDiscoverSeries;
