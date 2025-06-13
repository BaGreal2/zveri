import GenreBadge from '../../components/genre-badge';

interface Props {
	genres: { name: string }[];
}

const Genres = ({ genres }: Props) => {
	return (
		<div className="mb-5 flex gap-2">
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
