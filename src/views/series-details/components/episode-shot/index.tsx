import { useState, type CSSProperties } from 'react';
import { getTMDBImageUrl } from '@/lib/utils';

interface Props {
	name: string;
	stillPath: string;
	onClick: () => void;
	style?: CSSProperties;
}

const EpisodeShot = ({ name, stillPath, onClick, style }: Props) => {
	const [highResLoaded, setHighResLoaded] = useState(false);

	return (
		<button
			onClick={onClick}
			className="fade-in-top h-[155px] w-[250px] shrink-0 cursor-pointer overflow-hidden rounded-[30px] border border-white/25 bg-white/5 opacity-0 shadow-[0_0_10px_rgba(255,255,255,0.15)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_55px_rgba(255,255,255,0.2)] hover:backdrop-blur-md"
			style={style}
		>
			{stillPath && (
				<>
					<img
						src={getTMDBImageUrl(stillPath, 'w92')}
						className="pointer-events-none absolute top-0 left-0 size-full scale-105 object-cover blur-xs transition-opacity duration-500"
						aria-hidden="true"
					/>
					<img
						src={getTMDBImageUrl(stillPath, 'w500')}
						alt={name}
						onLoad={() => setHighResLoaded(true)}
						style={{ opacity: highResLoaded ? 1 : 0 }}
						className="pointer-events-none relative z-10 size-full object-cover"
					/>
				</>
			)}
		</button>
	);
};

export default EpisodeShot;
