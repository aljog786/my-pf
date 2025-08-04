import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import User from "@/models/User";
import connectDB from "@/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB(); // ensure DB is connected

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // You can modify this schema as needed
          await User.create({
            name: user.name || profile.name,
            email: user.email,
            password: "oauth_dummy_password", // dummy value, you won't use it
            isAdmin: false,
          });
        }

        return true;
      } catch (err) {
        console.error("Error saving OAuth user:", err);
        return false;
      }
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
