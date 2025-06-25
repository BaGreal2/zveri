import TextFade from '@/components/ui/text-fade';
import { pagesWithoutSearch } from '@/lib/config';
import { getOS } from '@/lib/utils';

interface Props {
	onOpen: () => void;
}

const SearchButton = ({ onOpen }: Props) => {
	const os = getOS();
	const modifierKey = os === 'macOS' ? '⌘' : 'Ctrl';

	return (
		<button
			className="flex h-[50px] min-w-40 cursor-pointer items-center gap-4 rounded-[20px] border border-white/15 bg-gradient-to-t from-white/10 to-white/[0.02] pr-7 pl-3.5"
			disabled={pagesWithoutSearch.includes(location.pathname)}
			onClick={onOpen}
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
	);
};

export default SearchButton;
