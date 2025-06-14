import { useEffect, useRef } from 'react';

interface Props {
	src: string;
}

const BackgroundAudio = ({ src }: Props) => {
	const audioRef = useRef(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.03;
			audioRef.current
				.play()
				.catch((error) => console.log('Audio playback failed:', error));
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
