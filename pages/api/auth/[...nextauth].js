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
        const user = await prisma.users.findMany({
          where: {
            OR: [
              { username: req.body.username },
              { email: req.body.username },
            ]
          },
        })
  
        if (user.length === 0) {
          return null
        } else {
          if (bcrypt.compareSync(req.body.password, user[0].password)) {
            return user[0]
          } else {
            return null
          }
        }
      }
    })
  ]
})