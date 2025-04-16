import React from 'react';

const LoginPage = React.lazy(() => import('../views/auth/login/index.tsx'));
const RegisterPage = React.lazy(
	() => import('../views/auth/register/index.tsx')
);
const HomePage = React.lazy(() => import('../views/home/index.tsx'));

interface Route {
  path: string;
  element: React.ReactNode;
  type: 'public' | 'private';
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
	}
];

export default routes;
