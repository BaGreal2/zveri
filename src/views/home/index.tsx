import { Navigate } from 'react-router';
import useAuthStore from '@/lib/store/auth';

const Home = () => {
	const { isAuthenticated, removeUser } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	const handleLogout = () => {
		removeUser();
	};

	return (
		<div>
			Home
			<button
				className="flex cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 py-2 text-white"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
};

export default Home;
