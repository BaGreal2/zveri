import { useMemo } from 'react';
import EpisodesNumberRow from '../../components/episodes-number-row';
import EpisodesSkeletonRow from '../../components/episodes-skeleton-row';
import useSeasons from '../../hooks/useSeasons';

interface Props {
	seriesId: string;
	numberOfSeasons: number;
}

const EpisodesTable = ({ seriesId, numberOfSeasons }: Props) => {
	const seasonsQueries = useSeasons(seriesId, numberOfSeasons);
	const maxEpisodeCount = useMemo(() => {
		if (
			seasonsQueries.length === 0 ||
			seasonsQueries.some((query) => query.isFetching)
		)
			return 0;

		return Math.max(
			...seasonsQueries.filter((q) => q.data).map((q) => q.data.episodes.length)
		);
	}, [seasonsQueries]);

	return (
		<div className="mt-[30px] max-w-full overflow-scroll">
			<div className="flex flex-col gap-1">
				<EpisodesNumberRow amount={maxEpisodeCount || 10} />
				{seasonsQueries.map((seasonQuery, index) => (
					<div className="flex items-center gap-2" key={index}>
						<span className="w-20 shrink-0 text-sm font-semibold">
							Season {index + 1}
						</span>
						<div className="flex gap-1">
							{seasonQuery.isLoading || !seasonQuery.data ? (
								<EpisodesSkeletonRow amount={maxEpisodeCount || 10} />
							) : seasonQuery.data.episodes.length > 0 ? (
								Array.from({ length: maxEpisodeCount || 10 }).map((_, i) => {
									const episode = seasonQuery.data.episodes[i];

									const episodeVoteValue = (episode?.vote_average || 0) / 10;
									const hue = episodeVoteValue * 120;
									const color = `hsl(${hue}, 40%, 40%)`;

									const voteFixed = episode?.vote_average.toFixed(1);

									if (!episode || voteFixed === '0.0') {
										return (
											<span
												key={i}
												className="flex size-10 items-center justify-center rounded-lg bg-white/40 text-sm font-semibold text-white"
											>
												N/A
											</span>
										);
									}

									return (
										<span
											key={i}
											className="flex size-10 items-center justify-center rounded-lg text-sm font-semibold text-white"
											style={{
												backgroundColor: color
											}}
										>
											{voteFixed}
										</span>
									);
								})
							) : (
								<div className="h-10" />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EpisodesTable;
