'use client';

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CREATE_ACCOUNT_MUTATION,
  CreateAccountResponse,
  CreateAccountVariables 
} from '@/graphql/mutations/createAccounts'

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await createAccount({
        variables: { name, email, password },
      });

      if (result.data?.createAccount) {
        // Successful account creation
        // Animate before redirecting
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/login');
      }
    } catch (error) {
      setError('An error occurred during registration');
      console.error('Registration error:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen"
    >
      {/* Left Panel */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50"
      >
        <div className="p-10">
          <Image src="/login-bg-1.jpg" height={750} width={750} alt="Background" className="rounded-2xl shadow-2xl border-none" />
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-50 p-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border-none">
            <CardContent className="flex flex-col items-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image
                  src="/rocket.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="mb-6"
                />
              </motion.div>

              <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create an Account</h2>
              <p className="text-sm text-center text-gray-600 mb-6">
                Please enter your details
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-t-2 border-white border-solid rounded-full"
                      />
                    ) : (
                      'Sign up'
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-red-500 text-sm mt-4"
                  >
                    Error: {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{' '}
                <a href="/login" className="text-purple-600 hover:text-purple-800 font-semibold transition">
                  Sign in
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

