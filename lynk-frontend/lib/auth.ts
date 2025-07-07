import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const NEXT_AUTH_CONFIG = {
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
  }),FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID || "",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ""
  }),
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    credentials: {
      username: { label: "Username/Email", type: "text", placeholder: "Enter your email or username" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
       if (!credentials?.username || !credentials?.password) return null;

    try {
      const response = await fetch("http://localhost:5000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) return null;

      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        image: data.user.image,
      };
    } catch (error) {
      console.error("Authorize error:", error);
      return null;
    }
  },
    
  })
],
callbacks: {
  async signIn({ user, account }: { user: any; account: any }) {
    if (account?.provider === "google") {
      try {
        const res = await axios.post("http://localhost:5000/api/user/google-signup", {
          email: user.email,
          name: user.name,
          image: user.image,
        });

        if (res.status !== 200 && res.status !== 201) {
          console.error("Failed to sync Google user to backend.");
          return false;
        }
      } catch (error) {
        console.error("Error syncing Google user to backend:", error);
        return false;
      }
    }

    return true;
  }
},
secret: process.env.NEXTAUTH_SECRET || "default_secret",
}
