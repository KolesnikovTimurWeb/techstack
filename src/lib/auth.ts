import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
// @ts-ignore
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
   adapter:PrismaAdapter(prisma),
   secret:process.env.PRISMA_PASSWORD,
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

         const passwordMatch = await compare(credentials.password, existingUser.password)
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
    ],
    callbacks:{
      async jwt({ token, user }) {
         if(user){
            return{
               ...token,
               username:user.username,
               id:user.id,
            }
         }

         return token
       },
       async redirect({ url, baseUrl }) {
         return baseUrl
       },
       async session({ session,token,user }) {
         return{
            ...session,
            user:{
               ...session.user,
               userId:token.id,
               username:token.username,
            }
         }
         return session
       }
    }
}