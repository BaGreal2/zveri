import { useEffect } from 'react';
import { useParams } from 'react-router';
import getSeriesDetails from '@/queries/get-series-details';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import BackgroundAudio from '@/components/background-audio';
import DetailBadge from './components/detail-badge';
import Overview from './components/overview';
import Poster from './components/poster';
import Rating from './components/rating';
import Title from './components/title';
import UserReaction from './components/user-reaction';
import EpisodesShots from './widgets/episodes-shots';
import EpisodesTable from './widgets/episodes-table';
import Genres from './widgets/genres';
import PageBackground from './widgets/page-background';
import SeriesDetailsSkeleton from './widgets/skeleton';

const SeriesDetails = () => {
	const { seriesId } = useParams();

	if (!seriesId) return <p>Series ID is required</p>;

	const seriesQuery = useQuery({
		queryKey: ['series', seriesId],
		queryFn: () => getSeriesDetails(seriesId)
	});

	useEffect(() => {
		if (!seriesQuery.data) {
			document.title = 'Loading... | Seasons';
			return;
		}
		document.title = `${seriesQuery.data?.name} | Seasons`;
		console.log(`Loaded series:`, seriesQuery.data);
	}, [seriesQuery.data]);

	if (seriesQuery.isLoading) return <SeriesDetailsSkeleton />;
	if (seriesQuery.isError || !seriesQuery.data)
		return <p>Failed to load series details</p>;

	return (
		<div className="bg-black pt-[155px]">
			{/* 13916 - Death Note */}
			{seriesId === '13916' && (
				<>
					<BackgroundAudio src="/audio/l-theme.mp3" />
					<div className="animate-fade-out-l pointer-events-none fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
						<img
							src="/images/l-logo.png"
							alt="L"
							className="animate-glitch size-[460px] invert"
						/>
					</div>
				</>
			)}
			<PageBackground backdropPath={seriesQuery.data.backdrop_path} />

			<div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center rounded-md px-4 py-5 shadow-lg">
				<div className="flex md:h-[510px] w-full flex-col items-end gap-16 md:flex-row">
					<Poster
						seriesId={seriesId}
						posterPath={seriesQuery.data.poster_path}
						status={seriesQuery.data.status}
					/>

					<div className="flex grow flex-col">
						<Genres genres={seriesQuery.data.genres} />

						<Title
							name={seriesQuery.data.name}
							countryCode={seriesQuery.data.origin_country[0]}
							firstAirDate={seriesQuery.data.first_air_date}
						/>

						<div className="mb-10 flex flex-wrap gap-10">
							<Rating
								rating={seriesQuery.data.vote_average}
								voteCount={seriesQuery.data.vote_count}
							/>

							<UserReaction />

							<DetailBadge
								name="Seasons"
								content={seriesQuery.data.number_of_seasons.toLocaleString()}
								style={{ animationDelay: '100ms' }}
							/>
							<DetailBadge
								name="Episodes"
								content={seriesQuery.data.number_of_episodes.toLocaleString()}
								style={{ animationDelay: '150ms' }}
							/>
							<DetailBadge
								name="Air Date"
								content={`${format(seriesQuery.data.first_air_date, 'dd MMM, yyyy')} – 
									${format(seriesQuery.data.last_air_date, 'dd MMM, yyyy')}`}
								style={{ animationDelay: '200ms' }}
							/>
						</div>

						<Overview content={seriesQuery.data.overview} />
					</div>
				</div>

				<EpisodesShots
					seriesId={seriesId}
					numberOfEpisodes={
						seriesQuery.data.seasons.find(
							(season) => season.season_number === 1
						)?.episode_count || 0
					}
				/>

				<EpisodesTable
					seriesId={seriesId}
					numberOfSeasons={seriesQuery.data.number_of_seasons}
				/>
			</div>
		</div>
	);
};

export default SeriesDetails;
