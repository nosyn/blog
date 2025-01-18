'use client';

import Link from 'next/link';

import { signInAction } from '@/actions/auth.action';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { signInFormSchema, TSignInForm } from '@/schemas/auth.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function SignInForm() {
  const router = useRouter();

  const form = useForm<TSignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: signInAction,
    onSuccess: () => {
      toast.success('Signed in successfully. Moving to dashboard', {
        id: 'sign-in',
      });
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message, { id: 'sign-in' });
    },
  });

  const onSubmit = useCallback(
    (values: TSignInForm) => {
      mutate(values);
    },
    [mutate]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Sign In</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id='password' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' disabled={isPending}>
                Sign In {isPending && <Loader2Icon className='animate-spin' />}
              </Button>
              <Button variant='outline' className='w-full' disabled={isPending}>
                Sign In with Google
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/sign-up' className='underline'>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
