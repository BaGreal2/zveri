import { useQueries } from '@tanstack/react-query';
import getSeasonDetails from '../actions/get-season-details';

const useSeasons = (seriesId: string, seasons: number) => {
	return useQueries({
		queries: Array.from({ length: seasons }, (_, i) => ({
			queryKey: ['series-episode', seriesId, i + 1],
			queryFn: () => getSeasonDetails(seriesId, i + 1),
			enabled: !!seriesId
		}))
	});
};

export default useSeasons;
