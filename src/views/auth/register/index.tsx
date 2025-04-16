import { Link } from 'react-router';

const Register = () => {
	return (
		<div>
			<button className="flex cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 py-2 text-white">
				Register
			</button>
			<Link to="/login">
				<button className="flex cursor-pointer items-center justify-center rounded-md bg-blue-400 px-4 py-2 text-white">
					Login
				</button>
			</Link>
		</div>
	);
};

export default Register;
