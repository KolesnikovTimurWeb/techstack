import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
const bcrypt = require("bcrypt");

export const authOptions: NextAuthOptions = {
   adapter:PrismaAdapter(prisma),
   session:{
      strategy:"jwt"
   },
   pages:{
      signIn:'/sign-in'
   },
     providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
         if(!credentials?.email || !credentials.password) return null

         const existingUser = await prisma.user.findUnique({
            where:{email:credentials?.email}
         }) 
         if(!existingUser) return null
         console.log(credentials?.password == existingUser.password)
         console.log(typeof existingUser.password)
         console.log(typeof credentials?.password)
         const passwordMatch = credentials?.password == existingUser.password
         if (!passwordMatch) {
            console.log("Password didn't match")
            return null
          }

          return {
            id:`${existingUser.id}`,
            username:existingUser.username,
            email:existingUser.email,
          }
        }
      })
    ]
}