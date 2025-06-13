import DislikeIcon from '@/icons/dislike.svg?react';
import LikeIcon from '@/icons/like.svg?react';

const UserReaction = () => {
	return (
		<div
			className="fade-in-top flex items-center gap-1.5 opacity-0"
			style={{ animationDelay: '50ms' }}
		>
			<button className="cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_rgba(108,135,84,0.2)]">
				<LikeIcon className="size-9" />
			</button>
			<button className="cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_rgba(157,88,64,0.2)]">
				<DislikeIcon className="size-9" />
			</button>
		</div>
	);
};

export default UserReaction;
