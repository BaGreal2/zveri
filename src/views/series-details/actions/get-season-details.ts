import { tmdbFetcher } from '@/lib/utils';

const getSeasonDetails = async (seriesId: string, season: number) => {
	const response = await tmdbFetcher(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${season}?language=en-US`
	);

	return response;
};

export default getSeasonDetails;
