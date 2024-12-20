'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useLazyQuery, gql } from '@apollo/client';

// GraphQL Query for Signin
const SIGNIN_QUERY = gql`
  query Signin($email: String!, $password: String!) {
    getAccountByID(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [signin, { data, loading, error }] = useLazyQuery(SIGNIN_QUERY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signin({
        variables: { email, password },
      });

      if (result?.data?.getAccountByID) {
        const user = result.data.getAccountByID;
        alert(`Welcome back, ${user.name}!`);
        router.push('/dashboard'); // Redirect to the dashboard
      } else {
        alert('Invalid email or password.');
      }
    } catch (err) {
      console.error('Signin failed:', err);
      alert('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-white">
        <div className="p-10">
          <Image src="/login-bg-1.jpg" height={750} width={750} alt="Background" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center font-roboto bg-purple-100 p-8">
        <Card className="w-full max-w-md p-6 bg-slate-900">
          <CardContent className="flex flex-col items-center">
            {/* Logo */}
            <Image
              src="/rocket.png"
              alt="Logo"
              width={100}
              height={100}
              className="mb-6"
            />

            <h2 className="text-2xl font-bold text-center text-white mb-4">Welcome back</h2>
            <p className="text-sm text-center text-gray-400 mb-6">
              Please enter your details
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="mt-1 w-full p-4"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="mt-1 w-full p-4"
                />
              </div>

              {/* Remember Me */}
              <div className="flex justify-between items-center text-gray-400">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="text-sm text-purple-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2"
                disabled={isLoading || loading}
              >
                {isLoading || loading ? 'Signing in...' : 'Sign in'}
              </Button>

              {/* Google Login */}
              <Button
                type="button"
                className="w-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 flex items-center justify-center py-2"
              >
                <Image src="/google.png" height={25} width={25} alt="Google" />
                Sign in with Google
              </Button>
            </form>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mt-2">
                Error: {error.message}
              </p>
            )}

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Don’t have an account?{' '}
              <a href="/signup" className="text-purple-400 hover:underline">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
