import useAuthStore from '@/store/auth';
import { Link } from 'react-router';

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
				className="bg-green-400 rounded-md text-white cursor-pointer py-2 px-4 flex justify-center items-center"
				onClick={handleLogin}
			>
				Login
			</button>
			<Link to="/register">
				<button className="bg-blue-400 rounded-md text-white cursor-pointer py-2 px-4 flex justify-center items-center">
					Register
				</button>
			</Link>
		</div>
	);
};

export default Login;
