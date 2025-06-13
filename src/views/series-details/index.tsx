import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import getSeriesDetails from './actions/get-series-details';
import getSeriesTrailer from './actions/get-series-trailer';
import DetailBadge from './components/detail-badge';
import Genres from './components/genres';
import Overview from './components/overview';
import PageBackground from './components/page-background';
import Poster from './components/poster';
import Rating from './components/rating';
import SeriesDetailsSkeleton from './components/skeleton';
import Title from './components/title';
import UserReaction from './components/user-reaction';
import EpisodesShots from './widgets/episodes-shots';

const SeriesDetails = () => {
	const { seriesId } = useParams();

	if (!seriesId) return <p>Series ID is required</p>;

	const query = useQuery({
		queryKey: ['series', seriesId],
		queryFn: () => getSeriesDetails(seriesId)
	});

	const trailerQuery = useQuery({
		queryKey: ['series-trailer', seriesId],
		queryFn: () => getSeriesTrailer(seriesId)
	});

	if (query.isLoading) return <SeriesDetailsSkeleton />;
	if (query.isError || !query.data) return <p>Failed to load series details</p>;

	return (
		<div className="bg-black pt-44">
			<PageBackground backdropPath={query.data.backdrop_path} />

			<div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center rounded-md px-4 py-5 shadow-lg">
				<div className="flex h-[510px] w-full items-end gap-16">
					<Poster
						posterPath={query.data.poster_path}
						trailer={trailerQuery.data?.results[0]}
						status={query.data.status}
					/>

					<div className="flex grow flex-col">
						<Genres genres={query.data.genres} />

						<Title
							name={query.data.name}
							countryCode={query.data.origin_country[0]}
							firstAirDate={query.data.first_air_date}
						/>

						<div className="mb-10 flex gap-10">
							<Rating
								rating={query.data.vote_average}
								voteCount={query.data.vote_count}
							/>

							<UserReaction />

							<DetailBadge
								name="Seasons"
								content={query.data.number_of_seasons.toLocaleString()}
								style={{ animationDelay: '100ms' }}
							/>
							<DetailBadge
								name="Episodes"
								content={query.data.number_of_episodes.toLocaleString()}
								style={{ animationDelay: '150ms' }}
							/>
							<DetailBadge
								name="Air Date"
								content={`${format(query.data.first_air_date, 'dd MMM, yyyy')} – 
									${format(query.data.last_air_date, 'dd MMM, yyyy')}`}
								style={{ animationDelay: '200ms' }}
							/>
						</div>

						<Overview content={query.data.overview} />
					</div>
				</div>

				<EpisodesShots
					seriesId={seriesId}
					numberOfEpisodes={query.data.number_of_episodes}
				/>
			</div>
		</div>
	);
};

export default SeriesDetails;
