'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import SectionTitle from '@/components/section-title';
import useSeasonsStore from '@/lib/store/seasons';
import HeroCarousel from './widgets/hero-carousel';
import SeriesCategory from './widgets/series-category';

const Discover = () => {
	const navigate = useNavigate();
	const { lastTimeSelected } = useSeasonsStore();
	useEffect(() => {
		document.title = 'Discover | Seasons';

		if (
			!lastTimeSelected ||
			new Date(lastTimeSelected).getDate() !== new Date().getDate()
		) {
			navigate('/season-select');
		}
	}, []);

	return (
		<div className="w-full overflow-x-hidden pb-[140px]">
			<div className="mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-visible pt-[165px]">
				<SectionTitle
					categoryName="Popular Series"
					title="Top now in your region"
					className="fade-in-top relative z-10 mb-5"
				/>
				<HeroCarousel />

				<SectionTitle
					categoryName="Popular Series"
					title="Time to discover"
					className="fade-in-top relative z-10 mb-5 opacity-0"
					style={{ animationDelay: '300ms' }}
				/>
				<div className="flex w-full flex-col gap-10">
					<SeriesCategory name="Trending Series" category="popular" />
					<SeriesCategory name="Top Rated Series" category="top_rated" />
					<SeriesCategory name="Airing Today" category="airing_today" />
					<SeriesCategory name="Trending This Week" category="trending_week" />
				</div>
			</div>
		</div>
	);
};

export default Discover;
