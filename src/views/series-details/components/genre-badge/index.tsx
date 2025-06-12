import TextFade from '@/components/ui/text-fade';

interface Props {
	genre: string;
}

const GenreBadge = ({ genre }: Props) => {
	return (
		<div className="flex h-10 cursor-default items-center justify-center rounded-full border border-white/25 bg-gradient-to-t from-white/25 to-white/10 px-5 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:backdrop-blur-md">
			<TextFade className="text-[13px] leading-4 font-semibold">
				{genre}
			</TextFade>
		</div>
	);
};

export default GenreBadge;
