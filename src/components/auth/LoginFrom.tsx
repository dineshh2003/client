// 'use client';

// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import Image from 'next/image';

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // LoginForm.tsx
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setError('');

//   try {
//     const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    
//     const result = await signIn('credentials', {
//       email,
//       password,
//       redirect: false,
//       callbackUrl,
//     });

//     if (!result) {
//       setError('Authentication failed');
//       return;
//     }

//     if (result.error) {
//       setError(result.error);
//       return;
//     }

//     if (result.ok) {
//       router.push(callbackUrl);
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     setError('An unexpected error occurred');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <div className="flex h-screen">
//       {/* Left Panel */}
//       <div className="hidden md:flex flex-1 items-center justify-center bg-white">
//         <div className="p-10">
//           <Image src="/login-bg-1.jpg" height={750} width={750} alt="Background" />
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="flex flex-1 flex-col justify-center items-center font-roboto bg-purple-100 p-8">
//         <Card className="w-full max-w-md p-6 bg-slate-900">
//           <CardContent className="flex flex-col items-center">
//             {/* Logo */}
//             <Image
//               src="/rocket.png"
//               alt="Logo"
//               width={100}
//               height={100}
//               className="mb-6"
//             />

//             <h2 className="text-2xl font-bold text-center text-white mb-4">Welcome back</h2>
//             <p className="text-sm text-center text-gray-400 mb-6">
//               Please enter your details
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-6 w-full">
//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-white">
//                   Email address
//                 </label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   placeholder="Enter your email"
//                   className="mt-1 w-full p-4"
//                 />
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-white">
//                   Password
//                 </label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   placeholder="Enter your password"
//                   className="mt-1 w-full p-4"
//                 />
//               </div>

//               {/* Remember Me */}
//               <div className="flex justify-between items-center text-gray-400">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="remember"
//                     className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember" className="ml-2 text-sm">
//                     Remember for 30 days
//                   </label>
//                 </div>
//                 <a href="#" className="text-sm text-purple-400 hover:underline">
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Sign In Button */}
//               <Button
//                 type="submit"
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Signing in...' : 'Sign in'}
//               </Button>

//               {/* Google Login */}
//               <Button
//                 type="button"
//                 className="w-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 flex items-center justify-center py-2"
//               >
//                 <Image src="/google.png" height={25} width={25} alt="Google" />
//                 Sign in with Google
//               </Button>
//             </form>

//             {/* Error Message */}
//             {error && (
//               <p className="text-red-500 text-sm mt-2">
//                 Error: {error}
//               </p>
//             )}

//             {/* Sign Up Link */}
//             <p className="text-center text-sm text-gray-400 mt-4">
//               Don't have an account?{' '}
//               <a href="/signup" className="text-purple-400 hover:underline">
//                 Sign up
//               </a>
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result) {
        setError('Authentication failed');
        return;
      }

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.ok) {
        // Animate before redirecting
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
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
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-50  p-8">
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

              <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome back</h2>
              <p className="text-sm text-center text-gray-600 mb-6">
                Please enter your details
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
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

                {/* Remember Me */}
                <div className="flex justify-between items-center text-gray-600">
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
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-800 transition">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-t-2 border-white border-solid rounded-full"
                      />
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </motion.div>

                {/* Google Login */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center py-3 rounded-md font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
                  >
                    <Image src="/google.png" height={20} width={20} alt="Google" className="mr-2" />
                    Sign in with Google
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

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{' '}
                <a href="/signup" className="text-purple-600 hover:text-purple-800 font-semibold transition">
                  Sign up
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

