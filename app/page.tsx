import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Lock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">SecureApp</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Secure Authentication for Your Next.js Application
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A production-ready authentication solution built with Next.js 14, Firebase, and Clean Architecture principles.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 pb-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 -translate-y-1/2 p-4 bg-blue-600 rounded-xl text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Secure Authentication</h3>
              <p className="mt-2 text-gray-600">
                Enterprise-grade security with Firebase Authentication, protecting your users' data.
              </p>
            </div>
            <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 -translate-y-1/2 p-4 bg-blue-600 rounded-xl text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">User Management</h3>
              <p className="mt-2 text-gray-600">
                Complete user management system with profile updates and password recovery.
              </p>
            </div>
            <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 -translate-y-1/2 p-4 bg-blue-600 rounded-xl text-white">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Protected Routes</h3>
              <p className="mt-2 text-gray-600">
                Easy-to-use route protection with our AuthGuard component.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}