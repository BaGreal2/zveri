import { Navigate } from 'react-router';
import useAuthStore from '@/lib/store/auth';

interface Props {
	element: React.ReactNode;
}

const PrivateRoute = ({ element }: Props) => {
	const { user } = useAuthStore();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return element;
};

export default PrivateRoute;
