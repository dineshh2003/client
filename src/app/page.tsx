"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isLoaded, userId } = useAuth(); // Clerk's auth hook to check if the user is authenticated
  const { user } = useUser(); // Get user info if available
  const router = useRouter();

  // Redirect to storeorders page if logged in
  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/storeorders");
    }
  }, [isLoaded, userId, router]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)] gap-4 bg-gradient-to-r from-b2 to-b3">
      {/* Image Section */}
      <div className="flex flex-1 items-center justify-center md:justify-end my-auto">
        <Image
          src="https://itl-website-aws.s3.ap-south-1.amazonaws.com/manage/assets/images/home-page-home-logistic-services2x.png"
          height={1000}
          width={1000}
          alt="Landing Image"
          className="max-w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-1 flex-col justify-center items-center gap-5 px-4">
        <h1 className="text-5xl font-bold text-green">Welcome to Logistics</h1>
        <p className="text-2xl text-slate-400">Delivering the future, today.</p>

        {/* Conditional Login/Logout Buttons */}
        <div className="flex gap-4">
          {isLoaded ? (
            userId ? (
              <>
                <Link 
                  href="/api/auth/logout"
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Logout
                </Link>
                <Link 
                  href="/storeorders"
                  className="bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Go to Store Orders
                </Link>
              </>
            ) : (
              <Link 
                href="/sign-in"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Login
              </Link>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
