import useAuthStore from '@/store/auth';
import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {
	const { isAuthenticated } = useAuthStore();

	if (isAuthenticated) {
		return <Navigate to="/home" replace />;
	}

	return (
		<>
			AuthLayout <Outlet />
		</>
	);
};

export default AuthLayout;
