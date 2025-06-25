interface Props {
	amount: number;
}

const EpisodesNumberRow = ({ amount }: Props) => (
	<div className="flex w-full items-center gap-2">
		<div className="flex h-10 w-[90px] shrink-0 items-center text-[15px] font-bold">
			Episode Nº
		</div>
		<div className="flex gap-2">
			{Array.from({
				length: amount ?? 10
			}).map((_, i) => (
				<span
					key={i}
					className="flex h-10 w-14 items-center justify-center text-sm text-[15px] font-bold text-white"
				>
					{i + 1}
				</span>
			))}
		</div>
	</div>
);

export default EpisodesNumberRow;
