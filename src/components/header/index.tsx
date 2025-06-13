import { NavLink } from 'react-router';
import LogoIcon from '@/icons/logo.svg?react';
import TextFade from '../ui/text-fade';

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
		to: 'events',
		label: 'Events'
	},
	{
		to: '/about',
		label: 'About'
	}
];

const Header = () => {
	return (
		<nav className="fixed top-4 left-1/2 z-10 flex h-[100px] w-full max-w-[1360px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full px-12 shadow-[0_2px_2px_0_rgba(0,0,0,0.35)] backdrop-blur-2xl">
			<div className="relative z-10 flex size-full items-center justify-between">
				<NavLink to="/home">
					<LogoIcon className="h-[46px] w-40" />
				</NavLink>
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
			{/* Radial White Glow */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0)_80%)]" />

			{/* Linear Black Fade (e.g. top shadow) */}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.75)_0%,_rgba(0,0,0,0)_100%)]" />
		</nav>
	);
};

export default Header;
