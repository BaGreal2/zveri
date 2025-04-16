import { Navigate } from 'react-router';
import useAuthStore from '@/lib/store/auth';

interface Props {
	element: React.ReactNode;
}

const PublicRoute = ({ element }: Props) => {
	const { user } = useAuthStore();

	if (user) {
		return <Navigate to="/home" replace />;
	}

	return element;
};

export default PublicRoute;
