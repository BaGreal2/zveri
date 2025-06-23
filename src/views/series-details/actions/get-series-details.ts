import { tmdbFetcher } from '@/lib/utils';
import type { SeriesDetails } from '@/types/tmdb';

const getSeriesDetails = async (seriesId: string): Promise<SeriesDetails> => {
	const response = await tmdbFetcher(
		`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`
	);

	return response;
};

export default getSeriesDetails;
