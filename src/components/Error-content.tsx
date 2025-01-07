'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <p className="text-center text-gray-400">
      {error === 'CredentialsSignin'
        ? 'Invalid email or password'
        : 'An error occurred during authentication'}
    </p>
  );
}

