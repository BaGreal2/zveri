import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateUser from '../actions/update-user';

export default function useProfileEdit() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['user'] });
		}
	});
}
