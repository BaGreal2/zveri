import { useQueries } from '@tanstack/react-query';
import getEpisodeDetails from '../actions/get-episode-details';

const useEpisodes = (seriesId: string, season: number, episodes: number) => {
	return useQueries({
		queries: Array.from({ length: episodes }, (_, i) => ({
			queryKey: ['series-episode', seriesId, season, i + 1],
			queryFn: () => getEpisodeDetails(seriesId, season, i + 1),
			enabled: !!seriesId
		}))
	});
};

export default useEpisodes;
