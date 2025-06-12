import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/lib/store/auth';
import login from './actions/login';

const loginFormSchema = z.object({
	identifier: z
		.string()
		.min(4, 'Identifier must be at least 4 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long')
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

const Login = () => {
	const { setUser, setToken } = useAuthStore();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema)
	});
	const { control, handleSubmit } = form;

	// @ts-expct-error Not using until backend deployed
	const { error, isError } = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			console.log('Data received:', data);
			setUser({
				username: data.user.username,
				email: data.user.email,
				id: data.user.id,
				createdAt: new Date(data.user.created_at),
				updatedAt: new Date(data.user.updated_at)
			});
			setToken(data.token);
		},
		onError: (error) => {
			console.error('Registration failed:', error);
		}
	});

	const onSubmit = () => {
		setUser({
			username: 'REMOVE_ME',
			email: 'REMOVE_ME',
			id: 123412,
			createdAt: new Date(),
			updatedAt: new Date()
		});
		setToken('REMOVE_ME');
		// mutate(data);
	};

	return (
		<div className="my-auto flex h-full items-center justify-center">
			<Form {...form}>
				<form
					className="flex w-96 flex-col items-center gap-2 rounded-md border border-gray-300 px-4 py-6 shadow-md"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-2xl font-bold">Login</h1>
					<FormField
						control={control}
						name="identifier"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Email or Username</FormLabel>
								<FormControl>
									<Input placeholder="igorkrutoy@gmail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="password"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="Password" type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{isError && (
						<div className="w-full text-red-500">
							{error instanceof Error ? error.message : 'An error occurred'}
						</div>
					)}

					<button
						type="submit"
						className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 py-2 text-white"
					>
						Login
					</button>
					<Link to="/register" className="cursor-pointer underline">
						Register
					</Link>
				</form>
			</Form>
		</div>
	);
};

export default Login;
