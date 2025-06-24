import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from '@/components/layouts/main-layout';
import Loading from '@/components/loading';
import PrivateRoute from '@/components/route-gates/private-route';
import PublicRoute from '@/components/route-gates/public-route';

const LoginPage = React.lazy(() => import('../views/auth/login'));
const RegisterPage = React.lazy(() => import('../views/auth/register'));
const ProfilePage = React.lazy(() => import('../views/profile'));
const HomePage = React.lazy(() => import('../views/home'));
const SeriesDetailsPage = React.lazy(() => import('../views/series-details'));
const DiscoverPage = React.lazy(() => import('../views/discover'));
const SeasonSelectPage = React.lazy(() => import('../views/season-select'));

const SeriesDetailsPageSkeleton = React.lazy(
	() => import('../views/series-details/widgets/skeleton')
);
const DiscoverPageSkeleton = React.lazy(
	() => import('../views/discover/widgets/skeleton')
);
const ProfilePageSkeleton = React.lazy(
	() => import('../views/profile/widgets/skeleton')
);

const router = createBrowserRouter([
	{
		path: '/',
		Component: MainLayout,
		children: [
			{
				index: true,
				Component: () => <Navigate to="/home" replace />
			},
			{
				path: 'home',
				Component: () => (
					<React.Suspense fallback={<Loading />}>
						<PrivateRoute element={<HomePage />} />
					</React.Suspense>
				)
			},
			{
				path: 'login',
				Component: () => (
					<React.Suspense fallback={<Loading />}>
						<PublicRoute element={<LoginPage />} />
					</React.Suspense>
				)
			},
			{
				path: 'register',
				Component: () => (
					<React.Suspense fallback={<Loading />}>
						<PublicRoute element={<RegisterPage />} />
					</React.Suspense>
				)
			},
			{
				path: 'profile',
				Component: () => (
					<React.Suspense fallback={<ProfilePageSkeleton />}>
						<PrivateRoute element={<ProfilePage />} />
					</React.Suspense>
				)
			},
			{
				path: 'series/:seriesId',
				Component: () => (
					<React.Suspense fallback={<SeriesDetailsPageSkeleton />}>
						<PrivateRoute element={<SeriesDetailsPage />} />
					</React.Suspense>
				)
			},
			{
				path: 'discover',
				Component: () => (
					<React.Suspense fallback={<DiscoverPageSkeleton />}>
						<PrivateRoute element={<DiscoverPage />} />
					</React.Suspense>
				)
			},
			{
				path: 'season-select',
				Component: () => (
					<React.Suspense fallback={<Loading />}>
						<PrivateRoute element={<SeasonSelectPage />} />
					</React.Suspense>
				)
			},
			{
				path: '*',
				Component: () => <Navigate to="/home" replace />
			}
		]
	}
]);

export default router;
