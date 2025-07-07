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
    async authorize(credentials) {
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
console.log("id is "+data.user.id)
      if (!response.ok) return null;

      
      return {
        id: data.user.id,        
        email: data.user.email,
        name: data.user.name,
      };
    } catch (error) {
      console.error("Authorize error:", error);
      return null;
    }
  }
    
  })
],
callbacks: {
  async jwt({ token, user, account }: { token: any; user?: any; account?: any }) {

    if (user) {
        token.id = user.id; // this id is the user.id which we set in the credials provider.
      }
      // Only on first login
      if (account?.provider === "google" && user?.email) {
        try {
          const res = await axios.post("http://localhost:5000/api/user/google-signup", {
            email: user.email,
            name: user.name,
            image: user.image,
          });

          const userFromBackend = res.data.data;

          token.id = userFromBackend.id; // 👈 Set the id in the token
        } catch (err) {
          console.error("Error setting token.id from backend:", err);
        }
      }

      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
  if (token?.id) {
    session.user.id = token.id;
  }
  return session;
}

},
secret: process.env.NEXTAUTH_SECRET || "default_secret",
}
