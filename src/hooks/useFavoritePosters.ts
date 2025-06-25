import getSeriesDetails from '@/queries/get-series-details';
import { useQuery } from '@tanstack/react-query';
import { getTMDBImageUrl } from '@/lib/utils';

export function useFavoritePosters(ids: string[]) {
	return useQuery({
		queryKey: ['favorite-posters', ids],
		enabled: ids.length > 0,
		queryFn: async () => {
			const results = await Promise.all(
				ids.map(async (id) => {
					try {
						const d = await getSeriesDetails(id);
						return {
							id,
							name: d.name,
							poster: d.poster_path
								? getTMDBImageUrl(d.poster_path, 'w500')
								: null
						};
					} catch {
						return { id, name: '', poster: null };
					}
				})
			);
			return results;
		}
	});
}
