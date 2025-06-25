import { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { NavLink } from 'react-router';
import TextFade from '@/components/ui/text-fade';
import AboutSign from './components/about-sign';

const Home = () => {
	useEffect(() => {
		document.title = 'Home | Seasons';
	}, []);
	const aboutRef = useRef<HTMLDivElement>(null);
	const scrollToAbout = () => {
		aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<div className="mx-auto w-full max-w-[1440px] pt-[186px]">
			<div className="relative z-10 mx-auto flex size-[693px] flex-col items-center pt-[204px]">
				<TextFade className="fade-in-top relative z-10 mb-2.5 text-5xl font-bold text-nowrap">
					Search by vibe, not by genre
				</TextFade>
				<TextFade
					className="fade-in-top relative z-10 mb-10 max-w-[460px] text-center text-lg leading-[18px] opacity-0"
					style={{ animationDelay: '150ms' }}
				>
					Choose a vibe of the series, not a category. From cozy romance to dark
					mysteries — pick your mood and we’ll handle the rest.
				</TextFade>
				<div
					className="fade-in-top relative z-10 flex gap-[14px] opacity-0"
					style={{ animationDelay: '300ms' }}
				>
					<NavLink
						to="/discover"
						className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] p-px font-medium text-white/80 backdrop-blur-3xl transition-all duration-300 ease-in-out hover:scale-105"
						style={{
							background:
								'conic-gradient(from -90deg at 50% 50%, #FFBB6E 0%, #D4FEFE 25%, #E3A7FA 50%, #8DF69B 75%, #FFBB6E 100%)'
						}}
					>
						<span className="size-full rounded-[20px] bg-black/40 px-[22px] py-[16px]">
							Start Discovering
						</span>
					</NavLink>
					<button
						onClick={scrollToAbout}
						className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-white/15 px-6 py-[18px] font-medium text-white/80 backdrop-blur-3xl transition-all duration-300 ease-in-out hover:scale-105"
					>
						More About
					</button>
				</div>
				<div className="fade-in-top absolute top-0 left-1/2 z-0 mx-auto size-[614px] -translate-x-1/2">
					<img
						src="/images/hero-circle.png"
						className="size-full object-contain"
						alt=""
					/>
				</div>
			</div>
			<div
				ref={aboutRef}
				className="fade-in-top relative mx-auto mb-[87px] flex w-full max-w-[1000px] scroll-mt-40 flex-col gap-[57px] opacity-0"
				style={{ animationDelay: '450ms' }}
			>
				<AboutSign
					title="Search for Series"
					description="Find shows that fit your vibe. Quickly browse through thousands of series based on mood, genre, or season."
					number={1}
				/>
				<img
					src="images/curve-1.png"
					className="absolute top-[58px] right-[223px] h-[137px] w-[165px]"
					alt=""
				/>
				<AboutSign
					title="Save & Track"
					description="Keep your favorites close. Save series, track your progress, and build your personal watchlist."
					number={2}
					className="ml-auto"
				/>
				<img
					src="images/curve-2.png"
					className="absolute top-[332px] right-[329px] h-[128px] w-[60px]"
					alt=""
				/>
				<AboutSign
					title="Customize Your Profile"
					description="Make it yours. Add your own avatar, set a banner, and personalize how your profile looks."
					number={3}
				/>
				<img
					src="images/curve-3.png"
					className="absolute top-[527px] right-[618px] h-[149px] w-[205px]"
					alt=""
				/>
				<AboutSign
					title="Join the Conversation"
					description="Leave your mark.  Comment on episodes, reviews and user profiles — share your thoughts and connect with others."
					number={4}
					className="ml-auto"
				/>
			</div>
			<div className="relative flex h-[586px] w-full max-w-[1092px] flex-col items-end pt-[60px]">
				<div className="relative z-10 flex flex-col gap-10">
					<TextFade className="relative z-10 max-w-[500px] text-5xl font-bold">
						Ready to explore your vibe?
					</TextFade>
					<NavLink
						to="/discover"
						className="flex h-14 w-fit cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-[#71C1FF]/25 bg-gradient-to-tl from-[#475B60] to-[#2D414C] px-6 py-[18px] font-medium text-white/80 transition-all duration-300 ease-in-out hover:scale-105"
					>
						Let’s go
						<FaArrowRight className="size-[22px]" />
					</NavLink>
				</div>
				<img
					src="/images/anime-girl.png"
					className="absolute top-0 left-0 size-full object-cover object-top"
					alt=""
				/>
			</div>
			<div className="absolute top-0 right-0 size-[1000px] -translate-x-44 -translate-y-1/2 rounded-full bg-[#E0677D] opacity-10 blur-[140px]" />
			<div className="absolute top-0 left-0 size-[1000px] -translate-y-1/2 rounded-full bg-[#C2DEE4] opacity-10 blur-[140px]" />
		</div>
	);
};

export default Home;
