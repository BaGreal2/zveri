import { useState, type CSSProperties } from 'react';
import { cn, getTMDBImageUrl } from '@/lib/utils';

interface Props {
	name: string;
	stillPath: string;
	style?: CSSProperties;
}

const EpisodeShot = ({ name, stillPath, style }: Props) => {
	const [highResLoaded, setHighResLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setShowModal(true);
		requestAnimationFrame(() => setIsOpen(true));
	};

	const closeModal = () => {
		setIsOpen(false);
		setTimeout(() => setShowModal(false), 300);
	};

	return (
		<>
			<button
				onClick={openModal}
				className="fade-in-top h-[155px] w-[250px] overflow-hidden rounded-[30px] border border-white/25 bg-white/5 opacity-0 shadow-[0_0_10px_rgba(255,255,255,0.15)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_55px_rgba(255,255,255,0.2)] hover:backdrop-blur-md"
				style={style}
			>
				<img
					src={getTMDBImageUrl(stillPath, 'w92')}
					className="pointer-events-none absolute top-0 left-0 size-full scale-105 object-cover blur-lg transition-opacity duration-500"
					aria-hidden="true"
				/>
				<img
					src={getTMDBImageUrl(stillPath, 'w500')}
					alt={name}
					onLoad={() => setHighResLoaded(true)}
					style={{ opacity: highResLoaded ? 1 : 0 }}
					className="pointer-events-none relative z-10 size-full object-cover"
				/>
			</button>

			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<button
						className={cn(
							'absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300',
							isOpen ? 'opacity-100' : 'opacity-0'
						)}
						onClick={closeModal}
					/>

					<img
						src={getTMDBImageUrl(stillPath, 'original')}
						alt={name}
						onClick={closeModal}
						className={cn(
							'relative z-10 max-h-[75%] max-w-[75%] rounded-3xl object-cover shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300',
							isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
						)}
					/>
				</div>
			)}
		</>
	);
};

export default EpisodeShot;
