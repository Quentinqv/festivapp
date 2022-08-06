import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

export default NextAuth({
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        delete user.password;
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "John" },
        password: {  label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {
        // console.log(req.body);
        const user = await prisma.users.findUnique({
          where: {
            email: req.body.username,
          },
        })
  
        if (bcrypt.compareSync(req.body.password, user.password)) {
          return user
        } else {
          return null
        }
      }
    })
  ]
})