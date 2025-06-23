import { useState } from 'react';
import type { CSSProperties } from 'react';
import { NavLink } from 'react-router';
import { useTvGenres } from '@/hooks/useTVGenres';
import { format } from 'date-fns';
import Rating from '@/views/series-details/components/rating';
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent
} from '@/components/ui/hover-card';
import TextFade from '@/components/ui/text-fade';
import { cn, getTMDBImageUrl } from '@/lib/utils';
import type { Series } from '@/types/tmdb';
import GenresPreview from '../genres-preview';

interface Props {
	series: Series;
	setHoverCardHovered: (hovered: boolean) => void;
	rowHovered: boolean;
	className?: string;
	style?: CSSProperties;
}

const SeriesCard = ({
	series,
	setHoverCardHovered,
	rowHovered,
	className,
	style
}: Props) => {
	const [highResLoaded, setHighResLoaded] = useState(false);
	const { data: genreMap } = useTvGenres();

	const genreNames = (series.genre_ids || [])
		.map((id) => ({ name: genreMap?.[id] }))
		.filter(
			(genre): genre is { id: number; name: string } =>
				typeof genre.name === 'string'
		);

	return (
		<HoverCard openDelay={120} closeDelay={120}>
			<HoverCardTrigger asChild>
				<NavLink
					to={`/series/${series.id}`}
					className={cn('group flex h-[180px] w-[300px]', className)}
					style={style}
				>
					<div
						className={cn(
							'h-full w-full overflow-hidden rounded-[18px] border-2 border-white/15 backdrop-blur-3xl transition-all duration-600 group-hover:opacity-0',
							rowHovered && 'opacity-50'
						)}
					>
						{series.backdrop_path && (
							<>
								<img
									src={getTMDBImageUrl(series.backdrop_path, 'w92')}
									className="absolute top-0 left-0 aspect-[15/9] w-full blur-xs"
									aria-hidden="true"
								/>
								<img
									src={getTMDBImageUrl(series.backdrop_path, 'w500')}
									onLoad={() => setHighResLoaded(true)}
									alt={series.name}
									style={{ opacity: highResLoaded ? 1 : 0 }}
									className="relative z-10 aspect-[15/9] w-full"
								/>
							</>
						)}
					</div>
				</NavLink>
			</HoverCardTrigger>

			<HoverCardContent
				side="top"
				align="center"
				sideOffset={0}
				collisionPadding={0}
				avoidCollisions={false}
				className="pointer-events-none z-20 min-h-[345px] w-[390px] origin-center translate-y-[95%] overflow-hidden rounded-[24px] border-2 border-white/15 bg-black/80 p-3 drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
				onPointerEnter={() => setHoverCardHovered(true)}
				onPointerLeave={() => setHoverCardHovered(false)}
			>
				{series.backdrop_path && (
					<img
						src={getTMDBImageUrl(series.backdrop_path, 'w500')}
						alt={series.name}
						className="aspect-[15/9] w-full rounded-[18px]"
					/>
				)}

				<div className="px-3.5 pt-5">
					<TextFade className="fade-in-top text-[20px] leading-[20px] font-bold">
						{series.name}
					</TextFade>

					<div className="mt-0.5 flex gap-2.5">
						{series.first_air_date && (
							<span
								className="fade-in-top text-white/65 opacity-0"
								style={{ animationDelay: '50ms' }}
							>
								({format(new Date(series.first_air_date), 'yyyy')})
							</span>
						)}
						<Rating
							rating={series.vote_average}
							className="opacity-0"
							style={{ animationDelay: '50ms' }}
							hideNumber
						/>
					</div>

					<GenresPreview
						genres={genreNames}
						className="fade-in-top my-[13px] opacity-0"
						style={{
							animationDelay: '150ms'
						}}
					/>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default SeriesCard;
