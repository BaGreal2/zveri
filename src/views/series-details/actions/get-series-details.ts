import { fetcher } from '@/lib/utils';

const getSeriesDetails = async (seriesId: string) => {
	const response = await fetcher(`/series/${seriesId}`);

	return response;
};

export default getSeriesDetails;
