// app/auth/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-100 p-4">
      <Card className="w-full max-w-md bg-slate-900 p-6">
        <CardContent className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Authentication Error</h1>
          <p className="text-center text-gray-400">
            {error === 'CredentialsSignin'
              ? 'Invalid email or password'
              : 'An error occurred during authentication'}
          </p>
          <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700">
            <Link href="/login">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}