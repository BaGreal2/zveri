import getGenreNames from '@/queries/get-genre-names';
import { useQuery } from '@tanstack/react-query';

export const useTvGenres = () => {
	return useQuery({
		queryKey: ['tv-genres'],
		queryFn: getGenreNames,
		select: (data) => {
			const map: Record<number, string> = {};
			data.genres.forEach((g: { id: number; name: string }) => {
				map[g.id] = g.name;
			});
			return map;
		},
		staleTime: Infinity
	});
};
