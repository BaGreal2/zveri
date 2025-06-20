'use client';

import SectionTitle from './components/section-title';
import HeroCarousel from './widgets/hero-carousel';
import SeriesCategory from './widgets/series-category';

const Discover = () => {
	return (
		<div className="w-full overflow-x-hidden">
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
				<div className="flex flex-col gap-10 w-full">
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
