import { Link } from 'react-router';
import useAuthStore from '@/lib/store/auth';

const Login = () => {
	const { login } = useAuthStore();

	const handleLogin = () => {
		login({
			email: 'example@gmail.com',
			password: 'password',
			name: 'John Doe',
			id: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		});
	};

	return (
		<div>
			<button
				className="flex cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 py-2 text-white"
				onClick={handleLogin}
			>
				Login
			</button>
			<Link to="/register">
				<button className="flex cursor-pointer items-center justify-center rounded-md bg-blue-400 px-4 py-2 text-white">
					Register
				</button>
			</Link>
		</div>
	);
};

export default Login;
