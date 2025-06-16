import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import Footer from '@/components/footer';
import Header from '@/components/header';

const pagesWithoutHeader = ['login', 'register'];
const pagesWithoutFooter = ['login', 'register'];

const MainLayout = () => {
	const location = useLocation();
	const pageName = location.pathname.split('/')[1];

	const showHeader = !pagesWithoutHeader.includes(pageName);
	const showFooter = !pagesWithoutFooter.includes(pageName);

	return (
		<>
			<ScrollRestoration />
			{showHeader && <Header />}
			<main className="flex min-h-screen flex-col">
				<Outlet />
			</main>
			{showFooter && <Footer />}
		</>
	);
};

export default MainLayout;
