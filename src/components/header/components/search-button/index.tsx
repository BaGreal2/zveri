import TextFade from '@/components/ui/text-fade';
import { getOS } from '@/lib/utils';

const SearchButton = () => {
	const os = getOS();
	const modifierKey = os === 'macOS' ? '⌘' : 'Ctrl';

	return (
		<button className="flex h-[50px] min-w-40 cursor-pointer items-center gap-4 rounded-[20px] border border-white/15 bg-gradient-to-t from-white/10 to-white/[0.02] pl-3.5 pr-7">
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
