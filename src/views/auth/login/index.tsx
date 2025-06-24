import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { NavLink } from 'react-router';
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
import TextFade from '@/components/ui/text-fade';
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
	useEffect(() => {
		document.title = 'Login | Seasons';
	}, []);

	const { setUser, setToken } = useAuthStore();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema)
	});
	const { control, handleSubmit } = form;

	const { mutate, isPending } = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
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
			console.error('Login failed:', error);
		}
	});

	const onSubmit = (data: LoginFormData) => {
		mutate(data);
	};

	return (
		<div className="flex grow flex-col pt-[99px]">
			<Form {...form}>
				<form
					className="relative z-10 box-content flex w-[39%] grow flex-col items-end justify-center rounded-r-[80px] border-[60px] border-black/35 bg-black/20 pr-[109px] shadow-[0_3px_2px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex w-[450px] flex-col">
						<div className="mb-[61px] flex w-full flex-col pl-5">
							<TextFade className="fade-in-top text-[32px] font-bold">
								Login
							</TextFade>
							<span
								className="fade-in-top -mt-1 text-[15px] leading-4 font-semibold text-white/65 opacity-0"
								style={{
									animationDelay: '150ms'
								}}
							>
								Welcome back! Сontinue your journey
							</span>
						</div>

						<FormField
							control={control}
							name="identifier"
							render={({ field }) => (
								<FormItem
									className="fade-in-top mb-4 w-full opacity-0"
									style={{ animationDelay: '300ms' }}
								>
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
								<FormItem
									className="fade-in-top mb-[61px] w-full opacity-0"
									style={{ animationDelay: '350ms' }}
								>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div
							className="fade-in-top flex gap-2.5 opacity-0"
							style={{ animationDelay: '450ms' }}
						>
							<button
								type="submit"
								className="flex h-14 cursor-pointer items-center justify-center gap-1 rounded-[20px] border border-[#71C1FF]/25 bg-gradient-to-tl from-[#53728A] to-[#294053] px-[30px] py-[18px] shadow-[0_3px_2px_rgba(0,0,0,0.35)]"
							>
								{isPending && (
									<FiLoader className="size-5 animate-spin text-white/75" />
								)}
								<span className="font-medium text-white/75">Login</span>
							</button>

							<NavLink
								to="/register"
								className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-white/15 bg-gradient-to-t from-white/10 to-white/5 px-[30px] py-[18px] shadow-[0_3px_2px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
							>
								<span className="font-medium text-white/65">
									I don’t have account
								</span>
							</NavLink>
						</div>
					</div>
				</form>
			</Form>
			<img
				src="/images/auth-bg.png"
				className="absolute top-0 left-0 z-0 size-full object-cover"
			/>
		</div>
	);
};

export default Login;
