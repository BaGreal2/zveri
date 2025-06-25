import TextFade from '@/components/ui/text-fade';
import { cn } from '@/lib/utils';

interface Props {
	title: string;
	description: string;
	number: number;
	className?: string;
}

const AboutSign = ({ title, description, number, className }: Props) => {
	return (
		<div
			className={cn(
				'relative flex w-[612px] flex-col rounded-[24px] border border-white/15 bg-gradient-to-t from-white/5 to-white/0 px-[50px] py-10 backdrop-blur-3xl',
				className
			)}
		>
			<TextFade className="text-[20px] font-bold">{title}</TextFade>
			<TextFade className="text-[13px] leading-[13px]">{description}</TextFade>
			<div className="absolute top-1/2 left-0 flex size-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-t from-white/75 to-white text-[20px] font-extrabold text-black">
				{number}
			</div>
		</div>
	);
};

export default AboutSign;
