import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

const LoginComponent = React.lazy(() => import('./views/auth/login/index.tsx'));
const RegisterComponent = React.lazy(
	() => import('./views/auth/register/index.tsx')
);
const HomeComponent = React.lazy(() => import('./views/home/index.tsx'));
const AuthLayoutComponent = React.lazy(() => import('./views/auth/Layout.tsx'));

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/home" element={<HomeComponent />} />
					<Route element={<AuthLayoutComponent />}>
						<Route path="/login" element={<LoginComponent />} />
						<Route path="/register" element={<RegisterComponent />} />
					</Route>
					<Route path="*" element={<Navigate to="/home" />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
