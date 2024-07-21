import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hash } from "bcrypt"

export async function POST(req:Request) {
    try{
      const body =await req.json()
      const {email,password , username} = body

      const existingUserByEmail = await prisma.user.findUnique({
         where:{
            email:email
         }
      })

      if(existingUserByEmail){
         return NextResponse.json({user:null, massage:"User with this email already exists"}, {status:419})
      }
      const existingUserByUsername = await prisma.user.findUnique({
         where:{
            username:username
         }
      })

      if(existingUserByUsername){
         return NextResponse.json({user:null, massage:"User with this username already exists"}, {status:409})
      }
      const newUser =await prisma.user.create({
         data:{
            username,
            email,
            password
         }
      })
      return NextResponse.json({user:newUser , massage:"User create"} , {status:200})
   }catch(err){
      console.log(err)
      }
}