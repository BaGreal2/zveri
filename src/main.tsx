import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import './globals.css';

const root = document.getElementById('root');

const LoginComponent = React.lazy(() => import('./views/auth/login/Login.tsx'));
const RegisterComponent = React.lazy(
	() => import('./views/auth/register/Register.tsx')
);
const HomeComponent = React.lazy(() => import('./views/home/Home.tsx'));
const AuthLayoutComponent = React.lazy(
	() => import('./views/auth/AuthLayout.tsx')
);

ReactDOM.createRoot(root!).render(
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
