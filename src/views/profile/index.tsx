import useAuthStore from '@/lib/store/auth';

const Profile = () => {
	const { user } = useAuthStore();
  console.log('User:', user);
	return (
		<div className="mt-22 flex flex-col">
			<h1>Profile</h1>
			<span>{user?.username}</span>
			<span>{user?.email}</span>
		</div>
	);
};

export default Profile;
