import { useEffect, useRef } from 'react';

interface Props {
	src: string;
}

const BackgroundAudio = ({ src }: Props) => {
	const audioRef = useRef(null);

	useEffect(() => {
		if (audioRef.current) {
			// @ts-expect-error TS2339
			audioRef.current.volume = 0.03;
			audioRef.current
				// @ts-expect-error TS2339
				.play()
				.catch((error: Error) => console.log('Audio playback failed:', error));
		}
	}, []);

	return (
		<audio ref={audioRef}>
			<source src={src} type="audio/mp3" />
			Your browser does not support audio playback.
		</audio>
	);
};

export default BackgroundAudio;
