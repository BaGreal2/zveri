interface Props {
	genre: string;
}

const GenreBadge = ({ genre }: Props) => {
	return (
		<div className="flex h-7 cursor-default items-center justify-center rounded-full border border-white/25 bg-gradient-to-t from-white/95 to-white/80 px-3 backdrop-blur-sm">
			<span className="text-[10px] leading-4 font-semibold text-black">
				{genre}
			</span>
		</div>
	);
};

export default GenreBadge;
