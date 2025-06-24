import { addFavorite, getFavorites, removeFavorite } from '@/queries/favorites';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useFavorites() {
	const qc = useQueryClient();

	const { data } = useQuery({
		queryKey: ['user-favorites'],
		queryFn: getFavorites
	});
	const ids = data?.favorites ?? [];

	const toggle = useMutation({
		mutationFn: (id: string) =>
			ids.includes(id) ? removeFavorite(id) : addFavorite(id),

		onMutate: async (id: string) => {
			await qc.cancelQueries({ queryKey: ['user-favorites'] });
			const previous = ids;
			const next = ids.includes(id)
				? // @ts-expect-error no type
					ids.filter((x) => x !== id)
				: [...ids, id];
			qc.setQueryData(['user-favorites'], next);
			return { previous };
		},

		onError: (_e, _id, ctx) =>
			ctx?.previous && qc.setQueryData(['user-favorites'], ctx.previous),

		onSettled: () => qc.invalidateQueries({ queryKey: ['user-favorites'] })
	});

	return { ids, toggle };
}
