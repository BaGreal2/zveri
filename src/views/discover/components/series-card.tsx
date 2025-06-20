import { getTMDBImageUrl } from '@/lib/utils';

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	series: any;
}

const SeriesCard = ({ series }: Props) => {
	return (
		<div className="relative h-[180px] w-[300px] overflow-hidden rounded-[18px] border-2 border-white/15 hover:scale-120 hover:p-6">
			<img
				src={getTMDBImageUrl(series.backdrop_path, 'w500')}
				alt={series.name}
				className="absolute top-0 left-0 z-0 size-full object-cover"
			/>
		</div>
	);
};

export default SeriesCard;
