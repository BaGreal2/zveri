import { NavLink } from 'react-router';

const Header = () => {
	return (
		<div className="fixed top-0 left-0 z-50 flex h-14 w-full items-center justify-center bg-gray-800/80 px-8 shadow-lg backdrop-blur-xl">
			<div className="flex h-full w-full max-w-[1440px] items-center justify-between">
				<NavLink to="/home" className="px-3 py-2 text-2xl font-black">
					Logo
				</NavLink>
			</div>
		</div>
	);
};

export default Header;
