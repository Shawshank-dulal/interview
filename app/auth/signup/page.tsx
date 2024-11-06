import Image from 'next/image';
import Link from 'next/link';
import { SignUpForm } from '@/modules/auth/interfaces/ui/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Image src="/logo.svg" alt="Logo" width={48} height={48} className="mx-auto" />
            <h2 className="mt-6 text-3xl font-bold">Create Account</h2>
            <p className="mt-2 text-gray-600">Get started with your free account today</p>
          </div>

          <SignUpForm />

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/auth/signin" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-orange-50">
        <div className="h-full flex items-center justify-center p-12">
          <Image
            src="/auth-illustration.svg"
            alt="Authentication illustration"
            width={600}
            height={500}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}