import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Loading from '@/components/loading/index.tsx';

const LoginComponent = React.lazy(() => import('./views/auth/login/index.tsx'));
const RegisterComponent = React.lazy(
	() => import('./views/auth/register/index.tsx')
);
const HomeComponent = React.lazy(() => import('./views/home/index.tsx'));

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/home" element={<HomeComponent />} />
					<Route path="/login" element={<LoginComponent />} />
					<Route path="/register" element={<RegisterComponent />} />
					<Route path="*" element={<Navigate to="/home" />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
