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
import { getTMDBImageUrl } from '@/lib/utils';
import GenresPreview from './genres-preview';

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	series: any;
}

const SeriesCard = ({ series }: Props) => {
	const { data: genreMap } = useTvGenres();

	const genreNames = (series.genre_ids || [])
		.map((id: number) => ({ name: genreMap?.[id] }))
		// @ts-expect-error no genre type
		.filter((g) => g.name);

	return (
		<HoverCard openDelay={120} closeDelay={120}>
			<HoverCardTrigger asChild>
				<NavLink
					to={`/series/${series.id}`}
					className="group flex h-[180px] w-[300px]"
				>
					<div className="h-full w-full overflow-hidden rounded-[18px] border-2 border-white/15 backdrop-blur-3xl transition-all duration-200 ease-out group-hover:opacity-0 group-hover/row:opacity-50">
						<img
							src={getTMDBImageUrl(series.backdrop_path, 'w500')}
							alt={series.name}
							className="aspect-[15/9] w-full"
						/>
					</div>
				</NavLink>
			</HoverCardTrigger>

			<HoverCardContent
				side="top"
				align="center"
				sideOffset={0}
				collisionPadding={0}
				avoidCollisions={false}
				className="data-[state=open]:animate-pop-in data-[state=closed]:animate-pop-out z-20 min-h-[345px] w-[390px] origin-center translate-y-[95%] overflow-hidden rounded-[24px] border-2 border-white/15 bg-black/80 p-3 drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
			>
				<img
					src={getTMDBImageUrl(series.backdrop_path, 'w500')}
					alt={series.name}
					className="aspect-[15/9] w-full rounded-[18px]"
				/>

				<div className="px-3.5 pt-5">
					<TextFade className="fade-in-top text-[20px] leading-[20px] font-bold">
						{series.name}
					</TextFade>

					<div className="mt-0.5 flex gap-2.5">
						<span
							className="fade-in-top text-white/65 opacity-0"
							style={{ animationDelay: '150ms' }}
						>
							({format(series.first_air_date, 'yyyy')})
						</span>
						<Rating
							rating={series.vote_average}
							className="opacity-0"
							style={{ animationDelay: '150ms' }}
							hideNumber
						/>
					</div>

					<GenresPreview
						genres={genreNames}
						className="fade-in-top my-[13px] opacity-0"
						style={{
							animationDelay: '300ms'
						}}
					/>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default SeriesCard;
