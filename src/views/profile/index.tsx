import { useEffect } from 'react';
import { getFavorites } from '@/queries/favorites';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import TextFade from '@/components/ui/text-fade';
import getUser from './actions/get-user';
import PageBackground from './components/page-background';
import useEditableField from './hooks/use-editable-field';
import useProfileEdit from './hooks/use-profile-edit';
import fileToBase64 from './utils/file-to-base64';
import FavoriteCarousel from './widgets/favorite-carousel';
import ProfileSkeleton from './widgets/skeleton';

const Profile = () => {
	useEffect(() => {
		document.title = 'Profile | Seasons';
	}, []);

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getUser
	});

	const { data: favoritesData } = useQuery({
		queryKey: ['user-favorites'],
		queryFn: getFavorites
	});
	const favorites = favoritesData?.favorites ?? [];

	const edit = useProfileEdit();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlePartialSave = (partial: Record<string, any>) =>
		edit.mutateAsync(partial);

	const usernameEdit = useEditableField({
		value: user?.username ?? '',
		onSave: (val) => handlePartialSave({ username: val }),
		className: 'text-[32px] font-bold text-white/90 focus:outline-none'
	});

	const bioEdit = useEditableField({
		value: user?.bio ?? '',
		as: 'textarea',
		onSave: (val) => handlePartialSave({ bio: val || null }),
		className:
			'mt-1 w-full resize-none rounded-md bg-white/10 h-14 p-2 text-white focus:outline-none'
	});

	const onAvatarPicked = async (file: File) =>
		handlePartialSave({ avatar_url: await fileToBase64(file) });

	const onBgPicked = async (file: File) =>
		handlePartialSave({ background_url: await fileToBase64(file) });

	if (!user) {
		return <ProfileSkeleton />;
	}

	return (
		<div className="mx-auto flex w-full max-w-[1440px] flex-col pt-[309px] pb-64">
			<PageBackground backgroundUrl={user?.background_url} />

			<label
				htmlFor="bgPicker"
				className="absolute top-[105px] left-1/2 z-10 -translate-x-1/2 cursor-pointer text-sm font-semibold tracking-wide text-white/30 transition-all duration-300 select-none hover:text-white/80 hover:underline"
			>
				Update background
				<input
					id="bgPicker"
					type="file"
					className="hidden"
					accept="image/*"
					onChange={(e) => e.target.files?.[0] && onBgPicked(e.target.files[0])}
				/>
			</label>

			<div className="relative z-10">
				<div className="mb-[30px] flex gap-10">
					<label className="flex size-[200px] cursor-pointer overflow-hidden rounded-[30px] border border-white/25 bg-gradient-to-t from-white/15 to-white/5 backdrop-blur-3xl">
						<input
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) =>
								e.target.files?.[0] && onAvatarPicked(e.target.files[0])
							}
						/>
						{user?.avatar_url ? (
							<img
								src={user.avatar_url}
								alt=""
								className="h-full w-full object-cover"
							/>
						) : null}
					</label>

					<div className="flex flex-col py-2.5">
						<TextFade className="text-[32px] font-bold">
							{usernameEdit.field ?? ''}
						</TextFade>
						<span className="-mt-1 mb-5 text-sm font-semibold text-white/65">
							With <span className="font-extrabold">seasons</span> since{' '}
							{user?.created_at && (
								<span className="font-extrabold">
									{format(user?.created_at, 'MMM,yyyy')}
								</span>
							)}
						</span>
						<div className="mb-2 flex flex-col gap-1">
							<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text font-bold text-transparent capitalize">
								About Me
							</span>
							<TextFade className="-mt-1">
								{user?.bio || bioEdit.dirty || bioEdit.editing
									? bioEdit.field
									: `Unfortunately we don’t know anything about ${user?.username} yet`}
							</TextFade>
						</div>
					</div>
				</div>

				<div className="mb-[30px] flex flex-col gap-2">
					<div className="flex gap-2.5 leading-4">
						<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text font-bold text-transparent capitalize">
							Favorite Genres
						</span>
						<TextFade className="font-bold">
							{user?.favorite_genres?.length ?? 0}
						</TextFade>
					</div>
					<div className="flex gap-2">
						{user?.favorite_genres?.length ? (
							// @ts-expect-error no type
							user?.favorite_genres.map((genre) => (
								<span
									key={genre.id}
									className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text font-bold text-transparent"
								>
									{genre.name}
								</span>
							))
						) : (
							<TextFade className="text-white/65">
								No favorite genres yet
							</TextFade>
						)}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex gap-2.5 leading-4">
						<span className="bg-gradient-to-t from-[#71C1FF] to-[#A2D8FF] to-70% bg-clip-text font-bold text-transparent capitalize">
							Saved Series
						</span>
						<TextFade className="font-bold">{favorites?.length ?? 0}</TextFade>
					</div>
					<FavoriteCarousel ids={favorites} />
				</div>
			</div>
		</div>
	);
};

export default Profile;
