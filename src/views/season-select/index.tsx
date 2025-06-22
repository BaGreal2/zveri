import { useEffect } from 'react';
import SectionTitle from '@/components/section-title';
import VibeSelect from './widgets/vibe-select';

const SeasonSelect = () => {
	useEffect(() => {
		document.title = 'Select Your Season | Seasons';
	}, []);

	return (
		<div className="w-full overflow-x-hidden pb-[140px]">
			<div className="mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-visible pt-[243px]">
				<SectionTitle
					categoryName="Welcome to Seasons"
					title="What’s your vibe today?"
					className="fade-in-top mb-10"
				/>

				<VibeSelect
					className="fade-in-top"
					style={{ animationDelay: '150ms' }}
				/>
			</div>
		</div>
	);
};

export default SeasonSelect;
