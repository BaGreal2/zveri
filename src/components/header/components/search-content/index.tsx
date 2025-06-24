import { useCallback, useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import getSearchSeries from './actions/get-search-series';
import Results from './widgets/results';
import SkeletonResults from './widgets/skeleton-results';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const SearchContent = ({ isOpen, onClose }: Props) => {
	const [term, setTerm] = useState('');
	const debounced = useDebounce(term, 200);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const { data, isLoading } = useQuery({
		queryKey: ['series-search', debounced],
		queryFn: () => getSearchSeries(debounced),
		enabled: debounced.trim().length > 0
	});

	const handleClose = () => {
		setTerm('');
		onClose();
	};

	const onKey = useCallback((e: KeyboardEvent) => {
		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				handleClose();
				break;
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onKey]);

	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed top-0 left-0 z-20 flex size-full items-center justify-center">
			<div className="absolute top-[249px] left-1/2 z-10 w-full max-w-[800px] -translate-x-1/2">
				<div className="fade-in-bottom relative mb-[30px] h-16 w-full">
					<img
						src="/images/search-icon.png"
						alt="Search"
						className="absolute top-1/2 left-5 z-10 h-9 w-[26px] -translate-y-1/2"
					/>
					<div className="absolute top-1/2 left-[62px] z-10 h-[18px] w-px -translate-y-1/2 bg-white/15" />

					<input
						ref={inputRef}
						className="size-full rounded-[20px] border border-white/25 bg-gradient-to-l from-black/20 to-black to-20% pr-[70px] pl-[79px] font-medium text-white/80 shadow-[0px_3px_2px_rgba(0,0,0,0.35)] backdrop-blur-3xl placeholder:font-medium placeholder:text-white/80 focus:outline-none"
						placeholder="Search series by name, genre or tag"
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>

					<button className="absolute top-1/2 right-4 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-[14px] border border-white/25 bg-gradient-to-t from-white/10 to-white/5 backdrop-blur-xl">
						<img
							src="/images/filter-icon.png"
							alt="Filter"
							className="size-[22px]"
						/>
					</button>
				</div>

				{isLoading ? (
					<SkeletonResults />
				) : (
					!!data && <Results results={data.results} onClose={handleClose} />
				)}
			</div>
			<button
				className="fade-in absolute top-0 left-0 z-0 size-full bg-black/70 backdrop-blur-xs"
				onClick={handleClose}
			/>
		</div>
	);
};

export default SearchContent;
