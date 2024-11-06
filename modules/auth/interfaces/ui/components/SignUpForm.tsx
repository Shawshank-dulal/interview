"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FirebaseAuthRepository } from '../../../infrastructure/repositories/FirebaseAuthRepository';
import { SignUpUseCase } from '../../../application/useCases/SignUpUseCase';
import { useAuthStore } from '../../../store/authStore';

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [error, setError] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      setError('');
      const authRepository = new FirebaseAuthRepository();
      const signUpUseCase = new SignUpUseCase(authRepository);
      const user = await signUpUseCase.execute(data.email, data.password, data.displayName);
      setUser(user);
      router.push('/prepare');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="displayName">Full Name</Label>
          <Input
            id="displayName"
            type="text"
            {...register('displayName')}
            placeholder="Enter your full name"
            className="mt-1"
          />
          {errors.displayName && (
            <p className="text-sm text-red-500 mt-1">{errors.displayName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="mail@website.com"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Min. 8 characters"
            className="mt-1"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-orange-500 hover:text-orange-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-orange-500 hover:text-orange-600">
            Privacy Policy
          </a>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {/* Implement Google Sign Up */}}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Sign up with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {/* Implement Apple Sign Up */}}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.05,11.97 C17.0389275,10.3054167 18.4012499,9.39416667 18.45,9.36 C17.6025,8.17416667 16.2800001,7.995 15.865,7.98 C14.725,7.86583333 13.6225,8.63916667 13.0425,8.63916667 C12.45,8.63916667 11.5575,7.99333333 10.5975,8.00916667 C9.3325,8.025 8.1575,8.77583333 7.5275,9.94166667 C6.2125,12.3133333 7.1975,15.8216667 8.45,17.7016667 C9.075,18.6183333 9.81,19.6433333 10.7775,19.6116667 C11.715,19.5766667 12.0825,19.0141667 13.2175,19.0141667 C14.34,19.0141667 14.6875,19.6116667 15.6675,19.5916667 C16.6775,19.5766667 17.3175,18.6733333 17.9275,17.7483333 C18.6525,16.6833333 18.9525,15.6433333 18.9675,15.5916667 C18.9375,15.5816667 17.065,14.8516667 17.05,11.97 L17.05,11.97 Z M15.5475,6.845 C16.0475,6.235 16.395,5.38416667 16.3125,4.54916667 C15.5975,4.58083333 14.7075,5.0525 14.185,5.64583333 C13.7225,6.16583333 13.3025,7.04083333 13.4,7.85833333 C14.1925,7.925 15.03,7.45166667 15.5475,6.845 L15.5475,6.845 Z"
            />
          </svg>
          Sign up with Apple
        </Button>
      </div>
    </form>
  );
}