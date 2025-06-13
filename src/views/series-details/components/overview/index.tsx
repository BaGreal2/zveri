import TextFade from '@/components/ui/text-fade';

interface Props {
	content: string;
}

const Overview = ({ content }: Props) => {
	return (
		<div className="mb-7 flex max-w-[840px] flex-col gap-2.5">
			<span className="fade-in-top bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text leading-4 font-extrabold text-transparent">
				Overview
			</span>
			<TextFade
				className="fade-in-top opacity-0"
				style={{ animationDelay: '50ms' }}
			>
				{content}
			</TextFade>
		</div>
	);
};

export default Overview;
