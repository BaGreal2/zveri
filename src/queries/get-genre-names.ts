import { tmdbFetcher } from '@/lib/utils';

const getGenreNames = async () => {
	const url = `https://api.themoviedb.org/3/genre/tv/list?language=en-US`;
	const response = await tmdbFetcher(url);

	return response;
};

export default getGenreNames;
