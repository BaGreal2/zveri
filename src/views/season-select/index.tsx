import { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import SectionTitle from '@/components/section-title';
import seasonGenresMap from '@/lib/data/season-genres-map';
import useSeasonsStore from '@/lib/store/seasons';
import { cn } from '@/lib/utils';
import type { Season } from '@/types/seasons';
import VibeDescription from './components/vibe-description';
import vibePropertiesMap from './data/vibe-properties';
import VibeSelect from './widgets/vibe-select';

const SeasonSelect = () => {
	useEffect(() => {
		document.title = 'Select Your Season | Seasons';
	}, []);
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);

	const { currentSeason, setLastTimeSelected } = useSeasonsStore();
	const navigate = useNavigate();

	const onDefaultDiscover = () => {
		setLastTimeSelected(new Date().toISOString());
		navigate('/discover');
	};

	return (
		<div className="w-full overflow-x-hidden pb-[140px]">
			<div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-visible pt-[90px]">
				<div className="relative mb-10 h-[190px] w-full min-w-[590px]">
					<div
						className={cn(
							'absolute bottom-0 left-1/2 h-fit -translate-x-1/2 transition-all duration-300',
							!currentSeason ? 'opacity-100' : 'opacity-0'
						)}
					>
						<SectionTitle
							categoryName="Welcome to Seasons"
							title="What’s your vibe today?"
							className="fade-in-top"
						/>
					</div>
					{Object.entries(vibePropertiesMap).map(
						([key, { title, description }]) => (
							<VibeDescription
								key={key}
								title={title}
								description={description}
								isActive={currentSeason === key}
								genresIds={seasonGenresMap[key as Season]}
							/>
						)
					)}
				</div>

				<VibeSelect
					className="fade-in-top opacity-0"
					style={{ animationDelay: '150ms' }}
				/>

				<div
					className={cn(
						'mt-[30px] flex items-center gap-[20px] transition-all duration-300',
						!currentSeason ? 'opacity-100' : 'opacity-0'
					)}
				>
					<span
						className="fade-in-top text-end text-lg leading-[18px] font-bold text-white opacity-0"
						style={{ animationDelay: '300ms' }}
					>
						Not sure?
						<br />
						<span className="text-white/45">Just...</span>
					</span>
					<button
						onClick={onDefaultDiscover}
						className="fade-in-top flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-white/15 bg-gradient-to-t from-white/15 to-white/10 px-6 py-[18px] opacity-0 backdrop-blur-3xl transition-all duration-300 ease-in-out hover:scale-105"
						style={{ animationDelay: '300ms' }}
					>
						<FaArrowRight className="size-[22px]" />
						<div className="h-[18px] w-px bg-white/15" />
						<span className="font-medium text-white/65">
							Explore Everything
						</span>
					</button>
				</div>
			</div>

			<div
				className={cn(
					'absolute bottom-0 left-1/2 flex h-[200px] w-full max-w-[1650px] -translate-x-1/2 gap-[10.5px]',
					!currentSeason ? 'opacity-100' : 'opacity-0'
				)}
			>
				{Object.values(vibePropertiesMap).map(({ color }, index) => (
					<div
						key={index}
						className="h-full grow translate-y-1/3 rounded-full opacity-50 blur-[140px]"
						style={{
							backgroundColor: color
						}}
					/>
				))}
			</div>

			<div
				className={cn(
					'absolute -top-32 left-1/2 size-[400px] -translate-x-1/2 rounded-full blur-[140px] transition-all duration-300',
					currentSeason ? 'opacity-60' : 'opacity-0'
				)}
				style={{
					backgroundColor: vibePropertiesMap[currentSeason ?? 'winter']?.color
				}}
			/>

			<div className="pointer-events-none absolute bottom-0 left-0 size-full overflow-hidden">
				{Object.entries(vibePropertiesMap).map(([key, { backgroundImage }]) => (
					<img
						key={key}
						src={backgroundImage}
						className={cn(
							'pointer-events-none absolute top-0 bottom-0 size-full scale-[1.45] object-cover object-top transition-all duration-300',
							currentSeason === key ? 'opacity-100' : 'opacity-0'
						)}
						alt=""
					/>
				))}
				<img
					src="/images/default-curve-bg.png"
					className={cn(
						'pointer-events-none absolute top-0 bottom-0 size-full scale-[1.45] object-cover object-top transition-all duration-300',
						!currentSeason ? 'opacity-100' : 'opacity-0'
					)}
					alt=""
				/>
			</div>
		</div>
	);
};

export default SeasonSelect;
