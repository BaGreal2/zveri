import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
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
import register from './actions/register';

const registerFormSchema = z.object({
	email: z.string().email('Invalid email address'),
	username: z.string().min(4, 'Username must be at least 4 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long')
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

const Register = () => {
	const navigate = useNavigate();
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema)
	});
	const { control, handleSubmit } = form;

	const { mutate, error, isError } = useMutation({
		mutationFn: register,
		onSuccess: () => {
			console.log('Registration successful');
			navigate('/login');
		},
		onError: (error) => {
			console.error('Registration failed:', error);
		},
	});

	const onSubmit = (data: RegisterFormData) => {
		mutate(data);
	};

	return (
		<div className="my-auto flex h-full items-center justify-center">
			<Form {...form}>
				<form
					className="flex w-96 flex-col items-center gap-2 rounded-md border border-gray-300 px-4 py-6 shadow-md"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-2xl font-bold">Register</h1>
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="username"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Username" {...field} />
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
						Register
					</button>
					<Link to="/login" className="cursor-pointer underline">
						Login
					</Link>
				</form>
			</Form>
		</div>
	);
};

export default Register;
