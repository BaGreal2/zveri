import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getTMDBImageUrl } from '@/lib/utils';
import getSeriesDetails from './actions/get-series-details';

const SeriesDetails = () => {
	const { seriesId } = useParams();

	if (!seriesId) {
		return <p>Series ID is required</p>;
	}

	const query = useQuery({
		queryKey: ['series', seriesId],
		queryFn: () => getSeriesDetails(seriesId)
	});

	return (
		<div>
			<h1>Series Details</h1>

			<div className="relative flex w-full items-center justify-center">
				<img
					src={getTMDBImageUrl(query.data?.poster_path, 'w200')}
					className="relative z-10"
				/>
				<img
					src={getTMDBImageUrl(query.data?.backdrop_path, 'original')}
					className="absolute top-0 left-0 h-full w-full object-cover opacity-75 blur-xs"
				/>
			</div>
			{query.isLoading ? (
				<p>Loading...</p>
			) : (
				<p>
					{query.data?.original_name} - {query.data?.overview}
				</p>
			)}
		</div>
	);
};

export default SeriesDetails;
