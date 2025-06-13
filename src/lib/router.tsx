import React from 'react';

const LoginPage = React.lazy(() => import('../views/auth/login/index.tsx'));
const RegisterPage = React.lazy(
	() => import('../views/auth/register/index.tsx')
);
const ProfilePage = React.lazy(() => import('../views/profile/index.tsx'));
const HomePage = React.lazy(() => import('../views/home/index.tsx'));
const SeriesDetailsPage = React.lazy(
	() => import('../views/series-details/index.tsx')
);

const SeriesDetailsSkeleton = React.lazy(
	() => import('../views/series-details/components/skeleton/index.tsx')
);

interface Route {
	path: string;
	element: React.ReactNode;
	type: 'public' | 'private';
	fallback?: React.ReactNode;
}

const routes: Route[] = [
	{
		path: '/home',
		type: 'private',
		element: <HomePage />
	},
	{
		path: '/login',
		type: 'public',
		element: <LoginPage />
	},
	{
		path: '/register',
		type: 'public',
		element: <RegisterPage />
	},
	{
		path: '/profile',
		type: 'private',
		element: <ProfilePage />
	},
	{
		path: '/series/:seriesId',
		type: 'private',
		fallback: <SeriesDetailsSkeleton />,
		element: <SeriesDetailsPage />
	}
];

export default routes;
