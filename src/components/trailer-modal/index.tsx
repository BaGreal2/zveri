import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { modalRoot } from '@/lib/roots';
import { cn } from '@/lib/utils';

interface Props {
	trailerKey: string;
	isOpen: boolean;
	onClose: () => void;
}

const TrailerModal = ({ trailerKey, isOpen, onClose }: Props) => {
	const [shouldRender, setShouldRender] = useState(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			requestAnimationFrame(() => setVisible(true));
		} else {
			setVisible(false);
			const timeout = setTimeout(() => setShouldRender(false), 300);
			return () => clearTimeout(timeout);
		}
	}, [isOpen]);

	if (!modalRoot || !shouldRender) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<button
				onClick={onClose}
				className={cn(
					'absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300',
					visible ? 'opacity-100' : 'opacity-0'
				)}
			/>

			<div
				className={cn(
					'relative z-10 aspect-video w-[min(90%,1300px)] overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300',
					visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
				)}
			>
				<iframe
					src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&rel=0`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="h-full w-full"
					title="Trailer"
				/>
			</div>
		</div>,
		modalRoot
	);
};

export default TrailerModal;
