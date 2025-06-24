import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router';
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
import register from './actions/register';

const registerFormSchema = z.object({
	email: z.string().email('Invalid email address'),
	username: z.string().min(4, 'Username must be at least 4 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long')
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

const Register = () => {
	useEffect(() => {
		document.title = 'Register | Seasons';
	}, []);

	const navigate = useNavigate();
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema)
	});
	const { control, handleSubmit } = form;

	const { mutate, isPending } = useMutation({
		mutationFn: register,
		onSuccess: () => {
			navigate('/login');
		},
		onError: (error) => {
			console.error('Registration failed:', error);
		}
	});

	const onSubmit = (data: RegisterFormData) => {
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
								Register
							</TextFade>
							<span
								className="fade-in-top -mt-1 text-[15px] leading-4 font-semibold text-white/65 opacity-0"
								style={{
									animationDelay: '150ms'
								}}
							>
								Create your account and start exploring!
							</span>
						</div>

						<FormField
							control={control}
							name="email"
							render={({ field }) => (
								<FormItem
									className="fade-in-top mb-4 w-full opacity-0"
									style={{ animationDelay: '300ms' }}
								>
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
								<FormItem
									className="fade-in-top mb-4 w-full opacity-0"
									style={{ animationDelay: '350ms' }}
								>
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
								<FormItem
									className="fade-in-top mb-[61px] w-full opacity-0"
									style={{ animationDelay: '400ms' }}
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
								className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-[#71C1FF]/25 bg-gradient-to-tl from-[#53728A] to-[#294053] px-[30px] py-[18px] shadow-[0_3px_2px_rgba(0,0,0,0.35)]"
							>
								{isPending && (
									<FiLoader className="size-5 animate-spin text-white/75" />
								)}
								<span className="font-medium text-white/75">
									Create Account
								</span>
							</button>

							<NavLink
								to="/login"
								className="flex h-14 cursor-pointer items-center justify-center gap-4 rounded-[20px] border border-white/15 bg-gradient-to-t from-white/10 to-white/5 px-[30px] py-[18px] shadow-[0_3px_2px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
							>
								<span className="font-medium text-white/65">
									I already have one
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

export default Register;
