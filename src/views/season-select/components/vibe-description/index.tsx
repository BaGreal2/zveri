import { useTvGenres } from '@/hooks/useTVGenres';
import Genres from '@/views/series-details/widgets/genres';
import TextFade from '@/components/ui/text-fade';
import { cn } from '@/lib/utils';

interface Props {
	title: string;
	description: string;
	isActive: boolean;
	genresIds: number[];
}

const VibeDescription = ({
	title,
	description,
	isActive,
	genresIds
}: Props) => {
	const { data: genreMap } = useTvGenres();
	const genreNames = (genresIds || [])
		.map((id) => ({
			id,
			name: genreMap?.[id]
		}))
		.filter(
			(genre): genre is { id: number; name: string } =>
				typeof genre.name === 'string'
		);

	return (
		<div
			className={cn(
				'absolute bottom-0 left-1/2 flex h-fit -translate-x-1/2 flex-col items-center gap-2.5 transition-all duration-300',
				isActive ? 'opacity-100' : 'opacity-0'
			)}
		>
			<TextFade className="text-3xl leading-[45px] font-bold">{title}</TextFade>
			<TextFade className="mb-[20px] text-center text-[14px] leading-[14px]">
				{description}
			</TextFade>
			<Genres genres={genreNames} className="mb-0" />
		</div>
	);
};

export default VibeDescription;
