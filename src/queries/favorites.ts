import { fetcher } from '@/lib/utils';

export const addFavorite = async (id: string) => {
	const res = await fetcher(`/favorites/${id}`, { method: 'POST' });

	return res;
};

export const removeFavorite = async (id: string) => {
	const res = await fetcher(`/favorites/${id}`, { method: 'DELETE' });

	return res;
};

export const getFavorites = async (): Promise<{ favorites: string[] }> => {
	const res = await fetcher('/favorites/');

	return res;
};
