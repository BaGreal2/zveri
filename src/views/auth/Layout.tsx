import { Navigate, Outlet } from 'react-router';
import useAuthStore from '@/lib/store/auth';

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
