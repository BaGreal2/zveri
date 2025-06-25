import { useCallback, useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router';
import TextFade from '@/components/ui/text-fade';
import type { Series } from '@/types/tmdb';
import ResultCard from '../../components/result-card';

interface Props {
	results: Series[];
	onClose: () => void;
}

const Results = ({ results, onClose }: Props) => {
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
	const navigate = useNavigate();

	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	const onKey = useCallback(
		(e: KeyboardEvent) => {
			if (!results.length) return;

			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					setFocusedIndex((i) => Math.min((i ?? -1) + 1, results.length - 1));
					break;
				case 'ArrowUp':
					e.preventDefault();
					setFocusedIndex((i) => Math.max((i ?? 1) - 1, 0));
					break;
				case 'Enter':
					e.preventDefault();
					if (
						focusedIndex === null ||
						focusedIndex < 0 ||
						focusedIndex >= results.length
					)
						return;
					onClose();
					navigate(`/series/${results[focusedIndex].id}`);
					break;
				case 'Escape':
					e.preventDefault();
					onClose();
					break;
			}
		},
		[results, focusedIndex, navigate]
	);

	useEffect(() => {
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onKey]);

	useEffect(() => {
		itemRefs.current.length = results.length;
		setFocusedIndex(0);
	}, [results]);

	const scrollRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (focusedIndex == null) return;

		const el = itemRefs.current[focusedIndex];
		const container = scrollRef.current;
		if (!el || !container) return;

		const elTop = el.offsetTop;
		const elBottom = elTop + el.offsetHeight;
		const elHeight = el.offsetHeight;
		const viewTop = container.scrollTop;
		const viewBottom = viewTop + container.clientHeight;
		const viewHeight = container.clientHeight;

		if (elTop + elHeight / 2 < viewTop + viewHeight / 2) {
			container.scrollTop = elTop - elHeight / 2;
		} else if (elBottom - elHeight / 2 > viewBottom - viewHeight / 2) {
			container.scrollTop = elBottom - viewHeight + elHeight / 2;
		}
	}, [focusedIndex]);

	return (
		<div className="flex w-full flex-col">
			<div className="mb-[22px] pl-5">
				<span className="text-[20px] leading-[20px]">
					<TextFade className="font-bold">{results.length}</TextFade>{' '}
					<span className="font-medium text-white/65">
						{results.length === 1 ? 'result' : 'results'}:
					</span>
				</span>
			</div>
			<PerfectScrollbar
				options={{ suppressScrollX: true }}
				containerRef={(ref) => (scrollRef.current = ref)}
				className="relative grow overflow-hidden pr-[17px]"
				style={{ maxHeight: 'calc(100vh - 390px)' }}
			>
				<div className="flex shrink-0 flex-col gap-2.5 overflow-visible">
					{results.map((series, i) => (
						<ResultCard
							key={series.id}
							series={series}
							isFocused={focusedIndex === i}
							onClose={onClose}
							ref={(el) => {
								itemRefs.current[i] = el;
							}}
						/>
					))}
				</div>
			</PerfectScrollbar>
		</div>
	);
};

export default Results;
