import { useEffect, useState } from 'react';

interface Props {
	backgroundUrl?: string;
}

const PageBackground = ({ backgroundUrl }: Props) => {
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		const multiplier = 15;
		const handleMouseMove = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * multiplier;
			const y = (e.clientY / window.innerHeight - 0.5) * multiplier;
			setOffset({ x, y });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<div className="absolute top-0 left-0 z-0 h-screen w-full overflow-hidden">
			<div className="absolute top-0 left-0 z-0 h-4/5 w-full overflow-hidden">
				{backgroundUrl ? (
					<>
						<img
							src={backgroundUrl}
							style={{
								transform: `translate(${offset.x}px, ${offset.y}px) scale(1.05)`,
								transition: 'transform 0.1s ease-out',
								opacity: imageLoaded ? 1 : 0
							}}
							onLoad={() => setImageLoaded(true)}
							className="absolute top-0 left-0 size-full object-cover transition-opacity duration-500"
						/>
						<div className="absolute top-0 left-0 size-full bg-gradient-to-b from-white/25 to-white/10" />
					</>
				) : (
					<div className="absolute top-0 left-0 size-full bg-gradient-to-b from-white/25 to-white/10" />
				)}
			</div>
			<div className="blur-fade absolute bottom-0 left-0 z-0 h-4/5 w-full" />
			<div className="absolute top-0 left-0 z-10 size-full bg-gradient-to-t from-black from-30% via-black/60 via-60% to-transparent" />
		</div>
	);
};

export default PageBackground;
