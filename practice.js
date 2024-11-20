import NextAuth from "next-auth";
import { GoogleProvider } from "next-auth/providers/google";
import { GithubProvider } from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "quiodafsdjkfdif",
      clientSecret: "ie009-23==490309?=",
    }),
    GithubProvider({
      clientId: "quiodafsdjkfdif",
      clientSecret: "ie009-23==490309?=",
    }),
  ],
});
