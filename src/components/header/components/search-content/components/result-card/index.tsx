import { forwardRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useTvGenres } from '@/hooks/useTVGenres';
import getSeriesDetails from '@/queries/get-series-details';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import TextFade from '@/components/ui/text-fade';
import { cn, getTMDBImageUrl } from '@/lib/utils';
import type { Series } from '@/types/tmdb';
import SkeletonDetailBadges from '../../widgets/skeleton-detail-badges';
import DetailBadge from '../detail-badge';
import Genres from '../genres';
import Rating from '../rating';
import Title from '../title';

interface Props {
	series: Series;
	onClose: () => void;
	isFocused?: boolean;
}

const ResultCard = forwardRef<HTMLDivElement, Props>(
	({ series, onClose, isFocused }, ref) => {
		const [highResLoaded, setHighResLoaded] = useState(false);

		const seriesQuery = useQuery({
			queryKey: ['series', series.id],
			queryFn: () => getSeriesDetails(series.id)
		});

		const { data: genreMap } = useTvGenres();

		const genreNames = (series.genre_ids || [])
			.map((id) => ({ name: genreMap?.[id] }))
			.filter(
				(genre): genre is { id: number; name: string } =>
					typeof genre.name === 'string'
			);

		const navitate = useNavigate();

		const handleClick = () => {
			navitate(`/series/${series.id}`);
			onClose();
		};

		return (
			<div ref={ref} className="w-full">
				<button
					onClick={handleClick}
					className={cn(
						'group flex h-[224px] w-full gap-6 rounded-[18px] border border-white/15 bg-gradient-to-t from-white/10 to-white/0 p-3 shadow-[0px_3px_2px_rgba(0,0,0,0.35)] backdrop-blur-3xl transition-all duration-300 hover:bg-white/5',
						isFocused && 'border-white/65'
					)}
				>
					{series.poster_path && (
						<div className="relative h-full w-[132px] shrink-0 overflow-hidden rounded-[12px]">
							<img
								src={getTMDBImageUrl(series.poster_path, 'w92')}
								className="absolute size-full object-cover blur-xs"
								aria-hidden="true"
							/>
							<img
								src={getTMDBImageUrl(series.poster_path, 'w500')}
								onLoad={() => setHighResLoaded(true)}
								alt={series.name}
								className="absolute size-full object-cover transition-all duration-500"
								style={{
									opacity: highResLoaded ? 1 : 0
								}}
							/>
						</div>
					)}
					<div className="flex h-full grow flex-col justify-between py-3.5">
						<div className="flex flex-col">
							{genreNames.length > 0 && (
								<Genres genres={genreNames} className="mb-[15px]" />
							)}
							<Title
								name={series.name}
								countryCode={series.origin_country?.[0]}
								firstAirDate={seriesQuery.data?.first_air_date}
								className="mb-2"
								style={{ animationDelay: '150ms' }}
							/>
							<TextFade
								className="fade-in-top text-[13px] leading-[13px] opacity-0"
								style={{ animationDelay: '300ms' }}
							>
								{series.overview.split('').slice(0, 250).join('') + '...' ||
									'No overview available.'}
							</TextFade>
						</div>
						<div
							className="fade-in-top flex opacity-0"
							style={{ animationDelay: '450ms' }}
						>
							<Rating
								rating={series.vote_average}
								voteCount={series.vote_count}
								className="mr-6"
							/>
							{seriesQuery.isLoading ? (
								<SkeletonDetailBadges />
							) : (
								seriesQuery.data && (
									<>
										{seriesQuery.data.number_of_seasons && (
											<DetailBadge
												name="Seasons"
												content={seriesQuery.data?.number_of_seasons.toLocaleString()}
											/>
										)}
										{seriesQuery.data?.number_of_episodes && (
											<DetailBadge
												name="Episodes"
												content={seriesQuery.data?.number_of_episodes.toLocaleString()}
											/>
										)}
										{seriesQuery.data?.first_air_date &&
											seriesQuery.data?.last_air_date && (
												<DetailBadge
													name="Air Date"
													content={`${format(seriesQuery.data?.first_air_date, 'dd MMM, yyyy')} – 
									${format(seriesQuery.data?.last_air_date, 'dd MMM, yyyy')}`}
												/>
											)}
									</>
								)
							)}
						</div>
					</div>

					<FaArrowRight
						className={cn(
							'absolute top-[33px] right-[33px] text-white/75 transition-all duration-300 group-hover:text-white/100',
							isFocused && 'text-white/100'
						)}
					/>
				</button>
			</div>
		);
	}
);

ResultCard.displayName = 'ResultCard';

export default ResultCard;
