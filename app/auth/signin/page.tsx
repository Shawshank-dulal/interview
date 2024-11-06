import Image from 'next/image';
import Link from 'next/link';
import { SignInForm } from '@/modules/auth/interfaces/ui/components/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Image src="/logo.svg" alt="Logo" width={48} height={48} className="mx-auto" />
            <h2 className="mt-6 text-3xl font-bold">Welcome Again!</h2>
            <p className="mt-2 text-gray-600">See your growth and get consulting support!</p>
          </div>

          <SignInForm />

          <div className="text-center text-sm">
            <span className="text-gray-600">Not registered? </span>
            <Link href="/auth/signup" className="text-orange-500 hover:text-orange-600 font-medium">
              Create an Account
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