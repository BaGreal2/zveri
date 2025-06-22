import SeriesPreviewCarousel from '../components/series-preview-carousel';
import type { TvCategory } from '../types/tv-category';

interface Props {
	name: string;
	category: TvCategory;
}

const SeriesCategory = ({ name, category }: Props) => {
	return (
		<div className="relative flex flex-col gap-[18px] hover:z-10">
			<div className="flex w-full items-center gap-[30px] px-[30px]">
				<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text text-[20px] leading-[20px] font-bold text-transparent capitalize">
					{name}
				</span>
				<div className="h-px grow bg-gradient-to-r from-transparent via-white/20 to-transparent" />
			</div>
			<SeriesPreviewCarousel category={category} />
		</div>
	);
};

export default SeriesCategory;
