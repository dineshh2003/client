'use client';

import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ErrorContent from '@/components/Error-content';

export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-100 p-4">
      <Card className="w-full max-w-md bg-slate-900 p-6">
        <CardContent className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Authentication Error</h1>
          <Suspense fallback={<p className="text-center text-gray-400">Loading...</p>}>
            <ErrorContent />
          </Suspense>
          <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700">
            <Link href="/login">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

