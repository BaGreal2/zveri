import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from '@/components/loading/index.tsx';
import PrivateRoute from '@/components/route-gates/private-route';
import PublicRoute from '@/components/route-gates/public-route';
import routes from '@/lib/router';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Suspense fallback={<Loading />}>
					<Routes>
						{routes.map(({ type, path, element }) => (
							<Route
								key={path}
								path={path}
								element={
									type === 'public' ? (
										<PublicRoute element={element} />
									) : (
										<PrivateRoute element={element} />
									)
								}
							/>
						))}
						<Route path="*" element={<Navigate to="/home" />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
