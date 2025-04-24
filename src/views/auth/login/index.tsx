import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
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

const loginFormSchema = z.object({
	email: z.string().email('cho ugodno'),
	password: z.string().min(6, 'Password must be at least 6 characters long')
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const Login = () => {
	const { setUser } = useAuthStore();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema)
	});
	const { control, handleSubmit } = form;

	const onSubmit = (data: LoginFormData) => {
		setUser({
			email: data.email,
			password: data.password,
			name: 'John Doe',
			id: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Form {...form}>
				<form
					className="flex w-96 flex-col items-center gap-2 rounded-md border border-gray-300 px-4 py-6 shadow-md"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-2xl font-bold">Login</h1>
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
