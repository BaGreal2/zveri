import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BACKEND_URL } from './constants';
import useAuthStore from './store/auth';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

export const fetcher = async (url: string, customOptions?: RequestInit) => {
	const token = useAuthStore.getState().token;
  console.log('sending token', token);
	const defaultOptions = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	};
	const options = { ...defaultOptions, ...customOptions };

	const res = await fetch(BACKEND_URL + url, options);

	console.log('fetch', res);
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json();
};

export const getTMDBImageUrl = (path: string, size: string) => {
	const baseUrl = 'https://image.tmdb.org/t/p/';
	const imageUrl = `${baseUrl}${size}${path}`;

	return imageUrl;
};
