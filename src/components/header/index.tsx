import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { NavLink, useLocation } from 'react-router';
import LogoAutumnIcon from '@/icons/logo-autumn.svg?react';
import LogoSpringIcon from '@/icons/logo-spring.svg?react';
import LogoSummerIcon from '@/icons/logo-summer.svg?react';
import LogoWinterIcon from '@/icons/logo-winter.svg?react';
import LogoIcon from '@/icons/logo.svg?react';
import useSeasonsStore from '@/lib/store/seasons';
import { cn } from '@/lib/utils';
import type { Season } from '@/types/seasons';
import TextFade from '../ui/text-fade';
import SearchButton from './components/search-button';
import SearchContent from './components/search-content';

const seasonsLocations = ['/season-select', '/discover'];

const logoMap: Record<Season, FC<React.SVGProps<SVGSVGElement>>> = {
	autumn: LogoAutumnIcon,
	spring: LogoSpringIcon,
	summer: LogoSummerIcon,
	winter: LogoWinterIcon
};

const links = [
	{
		to: '/discover',
		label: 'Discover'
	},
	{
		to: '/ratings',
		label: 'Ratings'
	},
	{
		to: '/articles',
		label: 'Articles'
	},
	{
		to: '/reviews',
		label: 'Reviews'
	},
	{
		to: '/news',
		label: 'News'
	}
];

const Header = () => {
	const { currentSeason } = useSeasonsStore();
	const location = useLocation();

	const [isSearchOpen, setIsSearchOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				setIsSearchOpen(true);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<>
			<nav
				className="fixed top-0 left-0 z-40 flex h-[100px] w-full items-center justify-center overflow-hidden border-b border-white/15 backdrop-blur-2xl"
				style={{
					background: `linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.81) 47.63%, rgba(0, 0, 0, 0.68) 100%)`
				}}
			>
				<div className="relative z-10 mx-auto flex size-full max-w-[1440px] items-center justify-between px-12">
					<div className="flex items-center gap-[30px]">
						<NavLink to="/home">
							<div className="relative h-[46px] w-40">
								{Object.entries(logoMap).map(([season, Icon]) => (
									<Icon
										key={season}
										className={cn(
											'absolute top-1/2 left-1/2 h-[114px] w-[180px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
											currentSeason === season &&
												seasonsLocations.includes(location.pathname)
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								))}
								<LogoIcon
									className={cn(
										'absolute top-1/2 left-1/2 h-[105px] w-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
										!currentSeason ||
											!seasonsLocations.includes(location.pathname)
											? 'opacity-100'
											: 'opacity-0'
									)}
								/>
							</div>
						</NavLink>
						<SearchButton onOpen={() => setIsSearchOpen(true)} />
					</div>
					<div className="flex items-center">
						<div className="flex gap-5">
							{links.map(({ to, label }) => (
								<NavLink key={to} to={to}>
									<TextFade className="text-[15px] leading-4 font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]">
										{label}
									</TextFade>
								</NavLink>
							))}
						</div>
						<div className="mr-[25px] ml-[33px] h-[26px] w-0.5 rounded-full bg-gradient-to-t from-white/55 to-white/20 shadow-[0_2px_2px_0_rgba(0,0,0,0.35)]" />
						<NavLink to="/profile">
							<img
								src="/images/profile-icon.png"
								alt="Profile"
								className="size-[34px]"
							/>
						</NavLink>
					</div>
				</div>
			</nav>
			<SearchContent
				isOpen={isSearchOpen}
				onClose={() => setIsSearchOpen(false)}
			/>
		</>
	);
};

export default Header;
