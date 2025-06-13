import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BACKEND_URL, TMDB_API_TOKEN } from './constants';
import useAuthStore from './store/auth';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

export const fetcher = async (url: string, customOptions?: RequestInit) => {
	const token = useAuthStore.getState().token;
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

export const tmdbFetcher = async (url: string, customOptions?: RequestInit) => {
	if (!TMDB_API_TOKEN) {
		throw new Error('VITE_TMDB_API_TOKEN is not defined in .env file');
	}

	const defaultOptions = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TMDB_API_TOKEN}`
		}
	};
	const options = { ...defaultOptions, ...customOptions };

	const res = await fetch(url, options);
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

export const getOS = () => {
	const nav = navigator as Navigator & { userAgentData?: unknown };

	// @ts-expect-error userAgentData is not defined in Navigator type
	if (nav.userAgentData?.platform) {
		// @ts-expect-error userAgentData is not defined in Navigator type
		const platform = nav.userAgentData.platform.toLowerCase();
		if (platform.includes('mac')) return 'macOS';
		if (platform.includes('win')) return 'Windows';
		return 'Other';
	}

	const ua = navigator.userAgent.toLowerCase();
	if (ua.includes('mac')) return 'macOS';
	if (ua.includes('win')) return 'Windows';
	return 'Other';
};
