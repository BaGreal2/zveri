interface Props {
	amount: number;
}

const EpisodesNumberRow = ({ amount }: Props) => (
	<div className="flex w-full items-center gap-2">
		<div className="h-10 w-20 shrink-0" />
		<div className="flex gap-1">
			{Array.from({
				length: amount ?? 10
			}).map((_, i) => (
				<span
					key={i}
					className="flex size-10 items-end justify-center text-sm font-semibold text-white opacity-60"
				>
					{i + 1}
				</span>
			))}
		</div>
	</div>
);

export default EpisodesNumberRow;
