import { useParams } from 'react-router';
import DislikeIcon from '@/icons/dislike.svg?react';
import LikeIcon from '@/icons/like.svg?react';
import StarEmptyIcon from '@/icons/star-empty.svg?react';
import StarFillIcon from '@/icons/star-fill.svg?react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import TextFade from '@/components/ui/text-fade';
import { getTMDBImageUrl } from '@/lib/utils';
import getSeriesDetails from './actions/get-series-details';
import getSeriesTrailer from './actions/get-series-trailer';
import GenreBadge from './components/genre-badge';
import Poster from './components/poster';
import useEpisodes from './hooks/useEpisodes';

function countryCodeToEmoji(countryCode: string) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

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

	const episodesQueries = useEpisodes(
		seriesId,
		1,
		Math.min(query.data?.number_of_episodes || 0, 5)
	);

	console.log('General query: ', query.data);
	console.log('Trailer query: ', trailerQuery.data);

	episodesQueries.forEach((query, i) => {
		console.log(`Episode ${i} status:`, query.status);
		console.log(`Episode ${i} data:`, query.data);
	});

	const rating = query.data?.vote_average || 0;
	const normalizedRating = Math.min(rating / 2, 5);

	return (
		<div className="bg-black pt-44">
			<div className="pointer-events-none absolute top-0 left-0 z-0 h-screen w-full overflow-hidden">
				<div className="absolute top-0 left-0 z-0 h-4/5 w-full overflow-hidden">
					<img
						src={getTMDBImageUrl(query.data?.backdrop_path, 'original')}
						className="size-full object-cover"
					/>
				</div>
				<div className="blur-fade absolute bottom-0 left-0 z-0 h-4/5 w-full" />
				<div className="absolute top-0 left-0 z-10 size-full bg-gradient-to-t from-black from-30% via-black/60 via-60% to-transparent" />
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center rounded-md px-4 py-5 shadow-lg">
				<div className="flex h-[510px] w-full items-end gap-16">
					<Poster
						posterPath={getTMDBImageUrl(query.data?.poster_path, 'original')}
						trailer={trailerQuery.data?.results[0]}
						status={query.data?.status}
					/>
					{!query.isLoading && query.data && (
						<div className="flex grow flex-col">
							<div className="mb-5 flex gap-2">
								{query.data.genres.map((genre) => (
									<GenreBadge key={genre.name} genre={genre.name} />
								))}
							</div>
							<h1 className="mb-5 text-[32px] leading-[32px] font-bold">
								{countryCodeToEmoji(query.data.origin_country[0])}{' '}
								<TextFade>{query.data.name}</TextFade>{' '}
								<span className="font-normal text-white/65">
									({format(new Date(query.data.first_air_date), 'yyyy')})
								</span>
							</h1>
							<div className="mb-10 flex gap-10">
								<div className="flex items-center gap-3.5">
									<TextFade className="text-[32px] leading-[32px] font-bold">
										{query.data.vote_average.toFixed(1)}
									</TextFade>
									<div className="flex flex-col gap-1">
										<span className="relative">
											<span
												className="absolute top-0 left-0 overflow-hidden"
												style={{
													width: `${(normalizedRating / 5) * 100}%`
												}}
											>
												<span className="relative top-0 left-0 flex gap-1.5 text-[#FFD823]">
													{Array.from({
														length: 5
													}).map((_, index) => (
														<StarFillIcon
															key={index}
															className="size-5 shrink-0"
														/>
													))}
												</span>
											</span>
											<span className="relative z-0 flex gap-1.5 text-[#FFD823]">
												{Array.from({
													length: 5
												}).map((_, index) => (
													<StarEmptyIcon key={index} className="size-5" />
												))}
											</span>
										</span>
										<TextFade className="text-[13px] leading-[13px] font-semibold">
											{query.data.vote_count.toLocaleString()}
										</TextFade>
									</div>
								</div>
								<div className="flex items-center gap-1.5">
									<button className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_rgba(108,135,84,0.2)] rounded-full">
										<LikeIcon className="size-9" />
									</button>
									<button className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_rgba(157,88,64,0.2)] rounded-full">
										<DislikeIcon className="size-9" />
									</button>
								</div>
								<div className="flex flex-col text-sm font-semibold">
									<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text leading-3.5 text-transparent">
										Seasons:
									</span>
									<TextFade className="text-base leading-4">
										{query.data.number_of_seasons.toLocaleString()}
									</TextFade>
								</div>
								<div className="flex flex-col text-sm font-semibold">
									<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text leading-3.5 text-transparent">
										Episodes:
									</span>
									<TextFade className="text-base leading-4">
										{query.data.number_of_episodes.toLocaleString()}
									</TextFade>
								</div>
								<div className="flex flex-col text-sm font-semibold">
									<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text leading-3.5 text-transparent">
										Air Date:
									</span>
									<TextFade className="text-base leading-4">
										{format(query.data.first_air_date, 'dd MMM, yyyy')} -{' '}
										{format(query.data.last_air_date, 'dd MMM, yyyy')}
									</TextFade>
								</div>
							</div>
							<div className="mb-7 flex max-w-[840px] flex-col gap-2.5">
								<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text leading-4 font-extrabold text-transparent">
									Overview
								</span>
								<p>{query.data?.overview}</p>
							</div>
						</div>
					)}
				</div>
				<div className="mt-[30px] flex gap-3.5">
					{episodesQueries.map((q, i) =>
						q.isLoading ? (
							<div
								key={i}
								className="h-[155px] w-[250px] overflow-hidden rounded-[30px] border border-white/25 bg-white/5 shadow-[0_0_10px_rgba(255,255,255,0.15)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_55px_rgba(255,255,255,0.2)] hover:backdrop-blur-md"
							/>
						) : (
							<div
								key={i}
								className="h-[155px] w-[250px] overflow-hidden rounded-[30px] border border-white/25 bg-white/5 shadow-[0_0_10px_rgba(255,255,255,0.15)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_55px_rgba(255,255,255,0.2)] hover:backdrop-blur-md"
							>
								<img
									src={getTMDBImageUrl(q.data?.still_path, 'w500')}
									alt={q.data?.name || `Episode ${i + 1}`}
									className="size-full object-cover"
								/>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default SeriesDetails;
