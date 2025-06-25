import { useMemo, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EpisodesNumberRow from '../../components/episodes-number-row';
import EpisodesSkeletonRow from '../../components/episodes-skeleton-row';
import useSeasons from '../../hooks/useSeasons';

interface Props {
	seriesId: string;
	numberOfSeasons: number;
}

const colorMap: Record<number, string> = {
	10: '#34B144',
	9: '#34B144',
	8: '#6AB134',
	7: '#8BB134',
	6: '#8BB134',
	5: '#B1AC34',
	4: '#B17D34',
	3: '#B15934',
	2: '#B13434',
	1: '#611818',
	0: '#611818'
};

const EpisodesTable = ({ seriesId, numberOfSeasons }: Props) => {
	const collapsible = numberOfSeasons >= 5;
	const [isExpanded, setIsExpanded] = useState(!collapsible);

	const seasonsQueries = useSeasons(seriesId, numberOfSeasons);
	const maxEpisodeCount = useMemo(() => {
		if (seasonsQueries.length === 0 || seasonsQueries.some((q) => q.isFetching))
			return 0;
		return Math.max(
			...seasonsQueries.filter((q) => q.data).map((q) => q.data.episodes.length)
		);
	}, [seasonsQueries]);

	return (
		<div className="mt-[30px] max-w-full rounded-[34px] border border-white/15 bg-gradient-to-t from-white/10 to-white/5 p-10 backdrop-blur-md">
			<div
				className={`relative transition-[max-height] duration-300 ${
					collapsible && !isExpanded
						? 'max-h-[260px] overflow-hidden'
						: 'max-h-none'
				}`}
			>
				<PerfectScrollbar
					options={{ suppressScrollY: true }}
					className="max-w-full overflow-hidden"
				>
					<div className="flex min-w-[720px] flex-col gap-2 pr-3 pb-3">
						<EpisodesNumberRow amount={maxEpisodeCount || 10} />
						{seasonsQueries.map((seasonQuery, index) => {
							if (seasonQuery.isLoading || !seasonQuery.data)
								return (
									<div className="flex items-center gap-2" key={index}>
										<span className="w-[90px] shrink-0 text-[15px] text-white/80">
											Season{' '}
											<span className="font-bold text-white">{index + 1}</span>
										</span>
										<EpisodesSkeletonRow amount={maxEpisodeCount || 10} />
									</div>
								);

							if (seasonQuery.data.episodes.length === 0) return null;

							return (
								<div className="flex items-center gap-2" key={index}>
									<span className="w-[90px] shrink-0 text-[15px] text-white/80">
										Season <span className="font-bold">{index + 1}</span>
									</span>
									<div className="flex gap-2">
										{Array.from({ length: maxEpisodeCount || 10 }).map(
											(_, i) => {
												const ep = seasonQuery.data.episodes[i];
												const vote = (ep?.vote_average || 0) / 10;
												const color =
													colorMap[Math.round(vote * 10)] || '#611818';
												const txt = ep?.vote_average.toFixed(1);

												if (!ep || txt === '0.0')
													return (
														<span
															key={i}
															className="flex h-10 w-14 items-center justify-center rounded-[10px] border border-white/15 bg-gradient-to-t from-white/5 to-white/10 font-semibold text-white backdrop-blur-md"
														>
															-
														</span>
													);

												return (
													<span
														key={i}
														className="relative flex h-10 w-14 items-center justify-center overflow-hidden rounded-[10px] font-semibold text-white"
														style={{ backgroundColor: color }}
													>
														<span className="absolute top-0 left-1/2 z-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-50 blur-lg" />
														<span className="relative z-10">{txt}</span>
													</span>
												);
											}
										)}
									</div>
								</div>
							);
						})}
					</div>
				</PerfectScrollbar>

				{collapsible && !isExpanded && (
					<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#171717] to-transparent" />
				)}
			</div>

			{collapsible && (
				<div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 justify-center">
					<button
						onClick={() => setIsExpanded((v) => !v)}
						className="flex items-center gap-2.5 text-white"
					>
						{isExpanded ? (
							<>
								<button className="flex size-[50px] cursor-pointer items-center justify-center rounded-[20px] border border-white/25 bg-gradient-to-t from-white/25 to-white/10 text-[13px] font-semibold text-nowrap backdrop-blur-3xl transition-all duration-300">
									<FaChevronUp size={16} />
								</button>
								<button className="flex h-[50px] cursor-pointer items-center justify-center rounded-[20px] border border-white/25 bg-gradient-to-t from-white/25 to-white/10 px-6 text-[13px] font-semibold text-nowrap backdrop-blur-3xl transition-all duration-300">
									Hide details
								</button>
							</>
						) : (
							<>
								<button className="flex size-[50px] cursor-pointer items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-t from-white/10 to-white/5 text-[13px] font-semibold text-nowrap backdrop-blur-3xl transition-all duration-300">
									<FaChevronDown size={16} />
								</button>
								<button className="flex h-[50px] cursor-pointer items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-t from-white/10 to-white/5 px-6 text-[13px] font-semibold text-nowrap backdrop-blur-3xl transition-all duration-300">
									Reveal all {numberOfSeasons} seasons
								</button>
							</>
						)}
					</button>
				</div>
			)}
		</div>
	);
};

export default EpisodesTable;
