import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Replace with real validation logic (e.g., database check)
        if (credentials.email === 'jojo@jojo.com' && credentials.password === 'password123') {
          return { id: '1', name: 'Dinesh', email: 'jojo@jojo.com' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    // authorized({request : {nextUrl} , auth}) {
    //     const isLoggedIn = !!auth?.user;
    //     const {pathname} = nextUrl;
    //     if(pathname.startsWith('/auth/signin') && isLoggedIn){
    //         return Response.redirect(new URL('/' , nextUrl));
    //     }
    //     return !!auth;
    // }
  },
});