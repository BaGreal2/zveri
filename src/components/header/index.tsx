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
		<nav
			className="fixed top-0 left-0 z-10 flex h-[100px] w-full items-center justify-center overflow-hidden backdrop-blur-2xl border-b border-white/15"
			style={{
				background: `linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.81) 47.63%, rgba(0, 0, 0, 0.68) 100%)`
			}}
		>
			<div className="relative z-10 mx-auto flex size-full max-w-[1360px] items-center justify-between px-12">
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
		</nav>
	);
};

export default Header;
