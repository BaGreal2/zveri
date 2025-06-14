import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import BackgroundAudio from '@/components/background-audio';
import getSeriesDetails from './actions/get-series-details';
import DetailBadge from './components/detail-badge';
import Overview from './components/overview';
import Poster from './components/poster';
import Rating from './components/rating';
import Title from './components/title';
import UserReaction from './components/user-reaction';
import EpisodesShots from './widgets/episodes-shots';
import Genres from './widgets/genres';
import PageBackground from './widgets/page-background';
import SeriesDetailsSkeleton from './widgets/skeleton';

const SeriesDetails = () => {
	const { seriesId } = useParams();

	if (!seriesId) return <p>Series ID is required</p>;

	const query = useQuery({
		queryKey: ['series', seriesId],
		queryFn: () => getSeriesDetails(seriesId)
	});

	useEffect(() => {
		if (!query.data) {
			document.title = 'Loading... | Seasons';
			return;
		}
		document.title = `${query.data?.name} | Seasons`;
	}, [query.data]);

	if (query.isLoading) return <SeriesDetailsSkeleton />;
	if (query.isError || !query.data) return <p>Failed to load series details</p>;

	return (
		<div className="bg-black pt-[155px]">
			{/* 13916 - Death Note */}
			{seriesId === '13916' && (
				<>
					<BackgroundAudio src="/audio/l-theme.mp3" />
					<div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-fade-out-l">
						<img
							src="/images/l-logo.png"
							alt="L"
							className="size-[460px] animate-glitch invert"
						/>
					</div>
				</>
			)}
			<PageBackground backdropPath={query.data.backdrop_path} />

			<div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col justify-center rounded-md px-4 py-5 shadow-lg">
				<div className="flex h-[510px] w-full items-end gap-16">
					<Poster
						seriesId={seriesId}
						posterPath={query.data.poster_path}
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
