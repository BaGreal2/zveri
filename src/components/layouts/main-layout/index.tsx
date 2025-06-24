import { Outlet, ScrollRestoration } from 'react-router';
import Footer from '@/components/footer';
import Header from '@/components/header';

const MainLayout = () => {
	return (
		<>
			<ScrollRestoration />
			<Header />
			<main className="flex min-h-screen flex-col">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
