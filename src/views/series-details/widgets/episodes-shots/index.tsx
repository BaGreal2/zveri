import EpisodeShot from '../../components/episode-shot';
import useEpisodes from '../../hooks/useEpisodes';

interface Props {
	seriesId: string;
	numberOfEpisodes: number;
}

const EpisodesShots = ({ seriesId, numberOfEpisodes }: Props) => {
	const episodesQueries = useEpisodes(
		seriesId,
		1,
		Math.min(numberOfEpisodes || 0, 5)
	);

	return (
		<div className="mt-[30px] flex gap-3.5">
			{episodesQueries
				.filter((q) => q.isSuccess && q.data)
				.map((q, i) => (
					<EpisodeShot
						key={i}
						name={q.data.name || `Episode ${i + 1}`}
						stillPath={q.data.still_path}
						style={{ animationDelay: `${i * 100}ms` }}
					/>
				))}
		</div>
	);
};

export default EpisodesShots;
