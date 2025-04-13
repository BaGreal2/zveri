import useAuthStore from '@/store/auth';
import { Navigate } from 'react-router';

const Home = () => {
	const { isAuthenticated, logout } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

  const handleLogout = () => {
    logout();
  }

	return (
		<div>
			Home

			<button
				className="bg-green-400 rounded-md text-white cursor-pointer py-2 px-4 flex justify-center items-center"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
};

export default Home;
