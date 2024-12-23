'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { client } from '@/apollo-client';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </SessionProvider>
  );
}