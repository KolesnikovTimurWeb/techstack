"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prisma from "./prisma"
import styles from "@/styles/Stacks.module.scss"
import { useSession } from "next-auth/react"


export const getUser =async()=>{
   const user = await getServerSession(authOptions)
   const username = user?.user.username
   return username
}
export const createStack =async({title,description,languages,userId, images}:{title:any, description:any,languages:any , userId:any,images:any})=>{
   const session = await getServerSession(authOptions)
   const userSessionId = session?.user.id


   const product = await prisma.stacks.create({
      data:{
         title,
         description,
         languages:[...languages],
         authorId: userSessionId,
         images,
      }
      
   })

}
export const putLike =async (productId: string)=>{
   const userId = "clyy96bwt0000133eua75uk1m"
   const likes = await prisma.likes.findFirst({
      where: {
      stacksId:productId,
        userId,
      },
    });
    if (likes) {
      await prisma.likes.delete({
        where: {
          id:likes.id,
        },
      });
    } else {
      const product = await prisma.likes.create({
         data:{
         stacksId:productId,
         userId,
      }
      })
   }

}
export const makeComment =async (productId: string , commentText:string)=>{
   const userId = "clyy96bwt0000133eua75uk1m"

    await prisma.comment.create({
      data:{
         userId,
         stacksId:productId,
         body:commentText,
      }
   })

}



