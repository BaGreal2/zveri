import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getTMDBImageUrl } from '@/lib/utils';
import getSeriesDetails from './actions/get-series-details';
import getSeriesTrailer from './actions/get-series-trailer';
import SeriesTrailers from './components/series-trailers';

interface SeriesDetailsProps {
	name: string;
	content: string;
}

const SeriesProperty = ({ name, content }: SeriesDetailsProps) => {
	return (
		<div className="flex gap-2">
			<span className="leading-5 font-semibold capitalize">{name}:</span>
			<span className="text-sm leading-5">{content}</span>
		</div>
	);
};

const SeriesDetails = () => {
	const { seriesId } = useParams();

	if (!seriesId) {
		return <p>Series ID is required</p>;
	}

	const query = useQuery({
		queryKey: ['series', seriesId],
		queryFn: () => getSeriesDetails(seriesId)
	});

	const trailerQuery = useQuery({
		queryKey: ['series-trailer', seriesId],
		queryFn: () => getSeriesTrailer(seriesId)
	});

	console.log(trailerQuery.data);
	console.log(query.data);

	return (
		<div className="pt-44">
			<div className="fixed top-0 left-0 size-full h-screen overflow-hidden">
				<img
					src={getTMDBImageUrl(query.data?.backdrop_path, 'original')}
					className="size-full object-cover opacity-75 blur-xs"
				/>
			</div>

			<div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-md bg-gray-600/60 px-4 py-5 shadow-lg backdrop-blur-2xl">
				<div className="flex w-full gap-5">
					<img
						src={getTMDBImageUrl(query.data?.poster_path, 'w300')}
						className="relative z-10 rounded-md"
					/>
					{!query.isLoading && query.data && (
						<div className="flex grow flex-col gap-2">
							<h1 className="text-2xl font-bold">{query.data.name}</h1>
							<div className="flex grow flex-col gap-px">
								<SeriesProperty
									name="genres"
									content={query.data.genres
										.map((genre) => genre.name)
										.join(', ')}
								/>
								<SeriesProperty
									name="first air date"
									content={format(
										new Date(query.data.first_air_date),
										'dd MMM, yyyy'
									)}
								/>
								<SeriesProperty
									name="last air date"
									content={format(
										new Date(query.data.last_air_date),
										'dd MMM, yyyy'
									)}
								/>
								<SeriesProperty
									name="vote average"
									content={query.data.vote_average.toFixed(1)}
								/>
								<SeriesProperty
									name="seasons"
									content={query.data.number_of_seasons.toString()}
								/>
								<SeriesProperty
									name="episodes"
									content={query.data.number_of_episodes.toString()}
								/>
								<SeriesProperty
									name="country"
									content={query.data.production_countries
										.map((country) => country.name)
										.join(', ')}
								/>
								<SeriesProperty
									name="language"
									content={query.data.original_language}
								/>
								{query.data.created_by.length > 0 && (
									<SeriesProperty
										name="author"
										content={query.data.created_by
											.map((author) => author.name)
											.join(', ')}
									/>
								)}
								<SeriesProperty name="status" content={query.data.status} />
							</div>
						</div>
					)}
				</div>
				<div className="w-full px-3 py-4">
					<p className="opacity-75">
						{query.data?.name} - {query.data?.overview}
					</p>
				</div>
				<div className="w-full px-3">
					{trailerQuery.isLoading && <p>Loading...</p>}
					{trailerQuery.data?.results.length === 0 && (
						<span className="text-xl font-bold">No trailer available</span>
					)}
					{trailerQuery.data?.results.length > 0 && (
						<SeriesTrailers trailers={trailerQuery.data.results} />
					)}
				</div>
			</div>
		</div>
	);
};

export default SeriesDetails;
