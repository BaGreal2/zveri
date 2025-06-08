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
			<div className="fixed top-0 left-0 z-0 h-screen w-full overflow-hidden">
				<div className="absolute top-0 left-0 z-0 h-4/5 w-full overflow-hidden">
					<img
						src={getTMDBImageUrl(query.data?.backdrop_path, 'original')}
						className="size-full object-cover"
					/>
				</div>
				<div className="absolute top-0 left-0 z-10 size-full bg-gradient-to-t from-black from-30% via-black/60 via-60% to-transparent" />
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-md px-4 py-5 shadow-lg">
				<div className="flex h-[510px] w-full items-end gap-16">
					<div className="h-full w-[336px] overflow-hidden rounded-3xl">
						<img
							src={getTMDBImageUrl(query.data?.poster_path, 'w300')}
							className="size-full object-cover"
						/>
					</div>
					{!query.isLoading && query.data && (
						<div className="flex grow flex-col">
							<h1 className="mb-5 text-[32px] leading-[32px] font-bold">
								<span className="bg-gradient-to-t from-white/75 to-white to-40% bg-clip-text text-transparent">
									{query.data.name}
								</span>{' '}
								<span className="font-normal text-white/65">
									({format(new Date(query.data.first_air_date), 'yyyy')})
								</span>
							</h1>
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
