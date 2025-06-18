import { useState } from 'react';
import { createPortal } from 'react-dom';
import TextFade from '@/components/ui/text-fade';
import { searchRoot } from '@/lib/roots';
import { getOS } from '@/lib/utils';

const SearchButton = () => {
	const [isActive, setIsActive] = useState(false);

	const os = getOS();
	const modifierKey = os === 'macOS' ? '⌘' : 'Ctrl';

	return (
		<>
			<button
				className="flex h-[50px] min-w-40 cursor-pointer items-center gap-4 rounded-[20px] border border-white/15 bg-gradient-to-t from-white/10 to-white/[0.02] pr-7 pl-3.5"
				onClick={() => setIsActive(true)}
			>
				<img
					src="/images/search-icon.png"
					alt="Search"
					className="h-9 w-[26px]"
				/>
				<div className="h-[18px] w-px bg-white/15" />
				<TextFade className="grow text-center leading-4 font-medium">
					{modifierKey} + K
				</TextFade>
			</button>
			{isActive &&
				searchRoot &&
				createPortal(
					<div className="fixed top-0 left-0 z-50 flex size-full items-center justify-center bg-black/70 backdrop-blur-md">
						<div className="absolute top-[30%] left-1/2 z-50 h-[40px] w-[40vw] -translate-x-1/2 rounded-lg bg-white/30 backdrop-blur-xl"></div>
					</div>,
					searchRoot
				)}
		</>
	);
};

export default SearchButton;
