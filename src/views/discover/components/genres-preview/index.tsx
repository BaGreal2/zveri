import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import GenreBadge from '../genre-badge';

interface Props {
	genres: { name: string }[];
	className?: string;
	style?: CSSProperties;
}

const GenresPreview = ({ genres, className, style }: Props) => {
	const previewCount = 2;
	const genresToShow = genres.slice(0, previewCount);

	return (
		<div className={cn('flex gap-2', className)} style={style}>
			{genresToShow.map(({ name }) => (
				<GenreBadge key={name} genre={name} />
			))}
			{genres.length > previewCount && (
				<div className="flex h-7 cursor-default items-center justify-center rounded-full border border-white/25 bg-gradient-to-t from-white/35 to-white/30 px-3 backdrop-blur-sm">
					<span className="text-[10px] leading-4 font-semibold text-white">
						+{genres.length - previewCount}
					</span>
				</div>
			)}
		</div>
	);
};

export default GenresPreview;
