import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/lib/store/auth';
import { getTMDBImageUrl } from '@/lib/utils';
import getTopRatedSeries from './actions/get-top-rated-series';

const Home = () => {
	const { setUser, setToken } = useAuthStore();
	const query = useQuery({
		queryKey: ['top-rated'],
		queryFn: () => getTopRatedSeries()
	});

	const handleLogout = () => {
		setUser(null);
		setToken(null);
	};

	return (
		<div className="overflow-x-hidden pt-32">
			<PerfectScrollbar>
				<ul className="flex gap-5 overflow-auto px-4">
					{/* @ts-expect-error No type for series */}
					{query.data?.results.map((series) => (
						<li key={series.id}>
							<NavLink to={`/series/${series.id}`}>
								<div className="h-96 w-52">
									<img
										src={getTMDBImageUrl(series.poster_path, 'w200')}
										className="h-auto w-full"
									/>
									<span className="text-lg font-bold">{series.name}</span>
								</div>
							</NavLink>
						</li>
					))}
				</ul>
			</PerfectScrollbar>
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
