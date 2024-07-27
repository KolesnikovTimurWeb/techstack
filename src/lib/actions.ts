"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prisma from "./prisma"
import styles from "@/styles/Stacks.module.scss"
import { useSession } from "next-auth/react"


export const getUser =async()=>{
   const session = await getServerSession(authOptions)
// @ts-ignore 
   const userSessionId = session?.user.userId
   if(!userSessionId){
      return null
   }

   const user = await prisma.user.findUnique({
      where:{
         id:userSessionId
      }
   })

   return user
}

export const upadteUser =async({username,developer,image}:{username?:any, developer?:any,image?:any })=>{
   const session = await getServerSession(authOptions)
   // @ts-ignore 
      const userSessionId = session?.user.userId
   await prisma.user.update({
      where: {
         id: userSessionId,
       },
      data:{
         username:username,
         developer:developer,
         image:image,
      }
   })
}


export const createStack =async({title,description,languages,userId, images , website}:{title:any, description:any,languages:any , userId:any,images:any,website:any})=>{
   const session = await getServerSession(authOptions)
// @ts-ignore 
   const userSessionId = session?.user.userId

   const product = await prisma.stacks.create({
      data:{
         title,
         description,
         languages:[...languages],
         authorId: userSessionId,
         images,
         website
      }
      
   })

}
export const putLike =async (productId: string)=>{
   const session = await getServerSession(authOptions)
   // @ts-ignore 
   const userSessionId = session?.user.userId
   const likes = await prisma.likes.findFirst({
      where: {
      stacksId:productId,
      userId:userSessionId,
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
         userId:userSessionId,
      }
      })
   }

}
export const makeComment =async (productId: string , commentText:string)=>{
   const session = await getServerSession(authOptions)
   // @ts-ignore 
   const userSessionId = session?.user.userId
   const userPicture = await prisma.user.findUnique({
      where:{
         id:userSessionId
      }
   })

    await prisma.comment.create({
      data:{
         userId:userSessionId,
         profilePicture:userPicture?.image,
         stacksId:productId,
         body:commentText,
      }
   })

}



