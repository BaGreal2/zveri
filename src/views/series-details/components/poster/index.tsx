import { useState } from 'react';
import { FaPlay, FaRegStar } from 'react-icons/fa';
import TextFade from '@/components/ui/text-fade';
import { getTMDBImageUrl } from '@/lib/utils';

interface Props {
	posterPath: string | null;
	trailer: unknown;
	status: string;
}

const Poster = ({ posterPath, trailer, status }: Props) => {
	const [highResLoaded, setHighResLoaded] = useState(false);

	const handleTrailerOpen = () => {
		if (trailer) {
			// @ts-expect-error trailer type is not defined
			const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
			window.open(trailerUrl, '_blank');
		}
	};
	return (
		<div className="fade-in-top relative h-full w-[336px] shrink-0 overflow-hidden rounded-3xl">
			{posterPath ? (
				<>
					<img
						src={getTMDBImageUrl(posterPath, 'w92')}
						className="absolute top-0 left-0 size-full scale-105 object-cover blur-lg transition-opacity duration-500"
						aria-hidden="true"
					/>
					<img
						src={getTMDBImageUrl(posterPath, 'original')}
						onLoad={() => setHighResLoaded(true)}
						style={{
							opacity: highResLoaded ? 1 : 0
						}}
						className="relative z-10 size-full object-cover"
					/>

					<div className="border-px absolute top-5 left-5 z-20 flex h-10 cursor-default items-center justify-center rounded-full border border-white/10 bg-gradient-to-t from-black/70 to-black/30 px-3.5 backdrop-blur-sm transition-all duration-300 ease-in-out">
						<TextFade className="text-[13px] leading-4 text-white">
							{status}
						</TextFade>
					</div>

					<button className="border-px absolute top-5 right-5 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-gradient-to-t from-black/70 to-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:backdrop-blur-md">
						<FaRegStar className="size-4" />
					</button>

					<button
						className="group absolute bottom-0 left-0 z-20 h-1/3 w-full cursor-pointer"
						onClick={handleTrailerOpen}
					>
						<div className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3.5">
							<div className="flex size-[50px] items-center justify-center rounded-full border border-white/20 bg-gradient-to-t from-white/20 to-white/5 backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:backdrop-blur-md">
								<FaPlay className="-mr-0.5 size-5" />
							</div>
							<TextFade className="text-lg font-bold transition-all duration-300 group-hover:translate-x-0.5">
								Play Trailer
							</TextFade>
						</div>

						<div className="absolute bottom-0 left-0 h-2/5 w-full backdrop-blur-xs" />
						<div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/85 to-black/0 transition-all duration-300 group-hover:h-[120%]" />
					</button>
				</>
			) : null}
		</div>
	);
};

export default Poster;
