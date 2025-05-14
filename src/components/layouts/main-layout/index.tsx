import { useLocation } from 'react-router';
import Footer from '@/components/footer';
import Header from '@/components/header';

const pagesWithoutHeader = ['login', 'register'];
const pagesWithoutFooter = ['login', 'register'];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();
	const pageName = location.pathname.split('/')[1];

	const showHeader = !pagesWithoutHeader.includes(pageName);
	const showFooter = !pagesWithoutFooter.includes(pageName);
	return (
		<>
			{showHeader && <Header />}
			<main className="flex min-h-screen flex-col">{children}</main>
			{showFooter && <Footer />}
		</>
	);
};

export default MainLayout;
