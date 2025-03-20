import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/model/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful sign in
    async signIn({ profile }) {
      //1. connect to databse
      await connectDB();
      //2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      //3. if not , create user
      if (!userExists) {
        //Truncate Username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. Return true to allow sign in
      return true;
    },
    //session callback function that modifies the session objext
    async session({ session }) {
      //1. Get the user from the database
      const user = await User.findOne({ email: session.user.email });
      //2. assign the userId from the session
      session.user.id = user._id.toString();
      //3. return the session
      return session;
    },
  },
};
