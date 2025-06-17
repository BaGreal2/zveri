import { Link } from 'react-router';
import ArrowUpBrokenIcon from '@/icons/arrow-up-broken.svg?react';
import GithubIcon from '@/icons/github.svg?react';
import InstagramIcon from '@/icons/instagram.svg?react';
import SeasonsXCDVIcon from '@/icons/seasons-x-cdv.svg?react';
import VimeoIcon from '@/icons/vimeo.svg?react';
import WikipediaIcon from '@/icons/wikipedia.svg?react';
import YoutubeIcon from '@/icons/youtube.svg?react';
import TextFade from '../ui/text-fade';

const footerLinks = [
	{
		to: '/contact-us',
		label: 'Contact Us'
	},
	{
		to: '/updates',
		label: 'Updates'
	},
	{
		to: '/authors',
		label: 'Authors'
	},
	{
		to: '/about-us',
		label: 'About'
	}
];

const socialLinks = [
	{
		to: 'https://github.com/BaGreal2/zveri',
		icon: GithubIcon
	},
	{
		to: 'https://www.youtube.com/watch?v=9lJrHyVzcKA',
		icon: YoutubeIcon
	},
	{
		to: 'https://www.wikiwand.com/en/articles/Genghis_Khan',
		icon: WikipediaIcon
	},
	{
		to: 'https://www.instagram.com/umiz3m/',
		icon: InstagramIcon
	},
	{
		to: 'https://www.vimeo.com/',
		icon: VimeoIcon
	}
];

const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return (
		<div className="relative flex h-[230px] w-full items-center justify-center overflow-hidden border-t border-white/10">
			<div className="relative z-20 flex w-full max-w-[1440px] items-center justify-between">
				<div className="flex flex-col gap-[30px]">
					<TextFade className="text-[15px] leading-4 font-light">
						© Seasons, 2025
					</TextFade>
					<div className="flex flex-col gap-3.5">
						<div className="flex gap-5">
							{footerLinks.map(({ to, label }) => (
								<Link key={to} to={to}>
									<TextFade className="text-[15px] leading-4 font-semibold">
										{label}
									</TextFade>
								</Link>
							))}
						</div>
						<div className="flex gap-3.5">
							{socialLinks.map(({ to, icon: Icon }) => (
								<Link
									key={to}
									to={to}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Icon className="h-6 w-6" />
								</Link>
							))}
						</div>
					</div>
				</div>

				<button
					className="absolute top-1/2 left-1/2 flex size-[50px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-t from-white/15 to-black/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:backdrop-blur-md"
					onClick={scrollToTop}
				>
					<ArrowUpBrokenIcon className="size-8" />
				</button>

				<div className="flex flex-col items-end gap-[42px]">
					<img src="/images/line-curved.png" alt="" className="w-[150px]" />
					<div className="flex flex-col items-end gap-3.5">
						<span className="text-[15px] leading-4 font-semibold">
							<TextFade className="from-white/25 to-white/65">Made by</TextFade>{' '}
							<TextFade>CDV students</TextFade>{' '}
							<TextFade className="from-white/25 to-white/65">with</TextFade>{' '}
							<TextFade>love 🤍</TextFade>
						</span>
						<SeasonsXCDVIcon className="h-[23px] w-[90px]" />
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 left-1/2 z-30 flex w-full max-w-[1440px] -translate-x-1/2 gap-2.5">
				<div className="h-[2px] grow bg-[#D4FEFE] opacity-50" />
				<div className="h-[2px] grow bg-[#E3A7FA] opacity-50" />
				<div className="h-[2px] grow bg-[#8DF69B] opacity-50" />
				<div className="h-[2px] grow bg-[#FFBB6E] opacity-50" />
			</div>
			<div className="absolute top-1/2 left-1/2 flex h-full w-full max-w-[1440px] -translate-x-1/2 -translate-y-1/2 items-end gap-2.5">
				<div className="h-[240px] grow bg-[#D4FEFE] opacity-50 blur-2xl" />
				<div className="h-[240px] grow bg-[#E3A7FA] opacity-50 blur-2xl" />
				<div className="h-[240px] grow bg-[#8DF69B] opacity-50 blur-2xl" />
				<div className="h-[240px] grow bg-[#FFBB6E] opacity-50 blur-2xl" />
			</div>
			<div className="absolute top-0 left-0 z-10 size-full bg-gradient-to-t from-black/80 via-black/95 to-black/100 backdrop-blur-2xl" />
		</div>
	);
};

export default Footer;
