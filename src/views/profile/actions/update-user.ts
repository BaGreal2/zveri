import { fetcher } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function updateUser(partial: Record<string, any>) {
	const body = Object.fromEntries(
		Object.entries(partial).filter(([, v]) => v !== undefined)
	);
	if (!Object.keys(body).length) return;

	await fetcher('/me/update', {
		method: 'PATCH',
		body: JSON.stringify(body)
	});
}
