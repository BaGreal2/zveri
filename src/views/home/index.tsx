import useAuthStore from '@/lib/store/auth';

const Home = () => {
	const { setUser } = useAuthStore();

	const handleLogout = () => {
		setUser(null);
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
