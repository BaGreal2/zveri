import { NavLink } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import TextFade from '@/components/ui/text-fade';
import useAuthStore from '@/lib/store/auth';
import { getTMDBImageUrl } from '@/lib/utils';
import getTopRatedSeries from './actions/get-top-rated-series';

const Home = () => {
	const { setUser, setToken } = useAuthStore();
	const query = useInfiniteQuery({
		queryKey: ['top-rated'],
		queryFn: ({ pageParam = 1 }) => getTopRatedSeries(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const currentPage = lastPage.page;
			const totalPages = lastPage.total_pages;

			return currentPage < totalPages ? currentPage + 1 : undefined;
		}
	});

	const handleLogout = () => {
		setUser(null);
		setToken(null);
	};

	return (
		<div className="overflow-x-hidden pt-[155px]">
			<ul className="mx-auto flex max-w-[1360px] flex-wrap justify-center gap-5 px-4">
				{query.data?.pages.map((page) =>
					page.results.map((series: unknown) => (
						// @ts-expect-error No type for series
						<li key={series.id}>
							{/* @ts-expect-error No type for series */}
							<NavLink to={`/series/${series.id}`}>
								<div
									className="fade-in-top group flex w-64 flex-col items-center gap-1 opacity-0"
									style={{ animationDelay: `${Math.random() * 200}ms` }}
								>
									<div className="h-96 w-full overflow-hidden rounded-2xl border border-white/25 shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-[0_0_55px_rgba(255,255,255,0.2)]">
										<img
											// @ts-expect-error No type for series
											src={getTMDBImageUrl(series.poster_path, 'w500')}
											className="size-full object-cover"
										/>
									</div>
									<TextFade className="text-center text-lg font-bold">
										{/* @ts-expect-error No type for series */}
										{series.name}
									</TextFade>
								</div>
							</NavLink>
						</li>
					))
				)}
			</ul>
			<button
				onClick={() => query.fetchNextPage()}
				className="mx-auto mt-10 flex h-12 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-gradient-to-t from-white/25 to-white/10 px-6 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:backdrop-blur-md"
			>
				<TextFade className="font-semibold">Load More</TextFade>
			</button>
			<button
				className="flex cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 py-2 text-white"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
};

export default Home;
