import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

export default NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "John" },
        password: {  label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {
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