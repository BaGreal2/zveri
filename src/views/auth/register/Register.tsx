import { Link } from 'react-router';

const Register = () => {
	return (
		<div>
			<button className="bg-green-400 rounded-md text-white cursor-pointer py-2 px-4 flex justify-center items-center">
				Register
			</button>
			<Link to="/login">
				<button className="bg-blue-400 rounded-md text-white cursor-pointer py-2 px-4 flex justify-center items-center">
					Login
				</button>
			</Link>
		</div>
	);
};

export default Register;
