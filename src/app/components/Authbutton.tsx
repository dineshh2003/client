'use client';

import { useUser, useAuth } from '@clerk/nextjs'; // Import useAuth for signOut
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AuthButtons: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth(); // Get signOut from useAuth
  const router = useRouter();

  if (!isLoaded) return <p>Loading...</p>; // Wait for the user state to load

  const handleLogout = async () => {
    await signOut(); // Call the signOut method from Clerk
    router.push('/'); // Redirect to home page after logging out
  };

  return (
    <nav className="flex items-center gap-4">
      {isSignedIn && user ? (
        <div className="flex items-center gap-2">
          <Image src="/User.png" height={40} width={40} alt="User" />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => router.push('/storeorders')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Login / Signup
        </button>
      )}
    </nav>
  );
};

export default AuthButtons;
