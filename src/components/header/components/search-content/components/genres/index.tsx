import { cn } from '@/lib/utils';
import GenreBadge from '../genre-badge';

interface Props {
	genres: { name: string }[];
	className?: string;
}

const Genres = ({ genres, className }: Props) => {
	return (
		<div className={cn('mb-5 flex gap-2', className)}>
			{genres.map(({ name }, i) => (
				<GenreBadge
					key={name}
					genre={name}
					style={{ animationDelay: `${i * 100}ms` }}
				/>
			))}
		</div>
	);
};

export default Genres;
