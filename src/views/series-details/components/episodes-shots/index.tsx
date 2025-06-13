import { getTMDBImageUrl } from '@/lib/utils';
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
					<div
						key={i}
						className="fade-in-top h-[155px] w-[250px] overflow-hidden rounded-[30px] border border-white/25 bg-white/5 opacity-0 shadow-[0_0_10px_rgba(255,255,255,0.15)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_55px_rgba(255,255,255,0.2)] hover:backdrop-blur-md"
						style={{ animationDelay: `${i * 100}ms` }}
					>
						<img
							src={getTMDBImageUrl(q.data.still_path, 'w500')}
							alt={q.data.name || `Episode ${i + 1}`}
							className="size-full object-cover"
						/>
					</div>
				))}
		</div>
	);
};

export default EpisodesShots;
