import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TMDB_API_TOKEN } from './constants';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

export const fetcher = async (url: string, customOptions?: RequestInit) => {
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
