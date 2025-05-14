import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Trailer {
	name: string;
	key: string;
}

interface Props {
	trailers: Trailer[];
}

const SeriesTrailers = ({ trailers }: Props) => {
	const [currentTrailer, setCurrentTrailer] = useState<number>(0);

	return (
		<div className="flex w-fit flex-col">
			<div className="flex h-8 w-full items-end">
				{trailers.slice(0, 3).map((trailer, index) => (
					<button
						key={index}
						className={cn(
							'max-w-[30%] min-w-44 cursor-pointer rounded-t-md bg-gray-600/40 px-4 text-white backdrop-blur-md duration-150 ease-in-out',
							index === currentTrailer
								? 'h-8 bg-gray-800/40'
								: 'h-6 bg-gray-600/40'
						)}
						onClick={() => setCurrentTrailer(index)}
					>
						<span
							className={cn(
								'block w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-white/80',
								index === currentTrailer && 'font-bold text-white'
							)}
						>
							{trailer.name}
						</span>
					</button>
				))}
			</div>
			<div className="aspect-video h-96 w-fit overflow-hidden rounded-md">
				<iframe
					className="aspect-video h-full"
					src={`https://www.youtube.com/embed/${trailers[currentTrailer].key}`}
					title="YouTube video player"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

export default SeriesTrailers;
