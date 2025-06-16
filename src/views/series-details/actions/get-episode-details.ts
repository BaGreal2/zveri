import { tmdbFetcher } from '@/lib/utils';

const getEpisodeDetails = async (
	seriesId: string,
	season: number,
	episode: number
) => {
	const response = await tmdbFetcher(
		`https://api.themoviedb.org/3/tv/${seriesId}/season/${season}/episode/${episode}?language=en-US`
	);

	return response;
};

export default getEpisodeDetails;
