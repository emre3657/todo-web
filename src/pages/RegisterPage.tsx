import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import type { RegisterInput } from '@/features/auth/schemas';
import { useRegister } from '@/features/auth/hooks';
import { registerSchema } from '@/features/auth/schemas';
import { ApiError } from '@/lib/api-client';
import { PasswordInput } from '@/components/ui/PasswordInput';

export function RegisterPage() {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setGlobalError(null);

    try {
      await registerMutation.mutateAsync(data);
    } catch (error: unknown) {
      if(!(error instanceof ApiError)) {
        setGlobalError('An unexpected error occurred. Please try again later.');
        return;
      }
      const responseData = error.response.data;

    if (
      (responseData?.code === "VALIDATION_ERROR" ||
        responseData?.code === "CONFLICT" ||
        responseData?.code === "UNIQUE_CONSTRAINT") &&
      Array.isArray(responseData.errors)
    ) {
      responseData.errors.forEach((fieldError: { field: string; message: string }) => {
        if (fieldError.field) {
          setError(
            fieldError.field as "username" | "email" | "password" | "repassword",
            { type: "server", message: fieldError.message }
          );
        }
      });
      return;
    }

      setGlobalError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="h-full min-h-full flex items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-6">Create An Account</h1>

        {globalError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete='username'
              {...register('username')}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete='email'
              {...register('email')}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <PasswordInput
              id="password"
              {...register('password')}
              autoComplete="new-password"
              className="mt-1 rounded-xl border-gray-300 bg-white focus:border-blue-600 focus:ring-blue-100"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="repassword" className="block text-sm font-medium text-gray-700">
              Password Again
            </label>
            <PasswordInput
              id="repassword"
              {...register('repassword')}
              autoComplete="new-password"
              className="mt-1 rounded-xl border-gray-300 bg-white focus:border-blue-600 focus:ring-blue-100"
            />
            {errors.repassword && (
              <p className="text-red-500 text-xs mt-1">{errors.repassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerMutation.isPending ? 'Submitting...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
