'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { useMutation, ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';


const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($name: String!, $email: String!, $password: String!) {
    createAccount(input: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name , setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const {data} = await createAccount({
            variables : {name, email , password},
        })

        if(data?.createAccount){
            console.log('User signed up successfully:', data.createAccount);
            alert(`Welcome ${data.createAccount.name}, Sign up successful!`);    
        } else {
        alert('Signup failed, please try again.');
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to sign up');
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
          <Image src="/rocket.png" alt="Logo" width={100} height={100} className="mb-6" />
          <h2 className="text-2xl font-bold text-center text-white mb-4">Create an Account</h2>
          <p className="text-sm text-center text-gray-400 mb-6">Please enter your details</p>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="mt-1 w-full p-4"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2"
              disabled={isLoading}
            >
              {isLoading ? 'creating account...' : 'Sign up'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{' '}
            <a href="/signin" className="text-purple-400 hover:underline">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}

export default function SignUp() {
    return (
      <ApolloProvider client={client}>
        <SignUpForm />
      </ApolloProvider>
    );
  }
