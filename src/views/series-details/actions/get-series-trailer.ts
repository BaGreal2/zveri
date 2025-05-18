import { fetcher } from '@/lib/utils';

const getSeriesTrailers = async (seriesId: string) => {
	const response = await fetcher(`/series/${seriesId}/videos`);

	return response;
};

export default getSeriesTrailers;
