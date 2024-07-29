import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import styles from '@/styles/Main.module.scss'
import MyStacksCard from '@/components/MyStackCard'

const myStacks = async () => {
   const user = await getServerSession(authOptions)

   const userId = user?.user.id
   if (!user) {
      redirect('/sign-up')
   }
   const userStacks = await prisma.stacks.findMany({
      where: {
         authorId: userId
      },
      include: {
         comment: true,
         likes: true,
      }
   })
   return (
      <div className={styles.myStacks}>
         <div className="container">
            <div className={styles.myStacks_block}>
               {userStacks.map((item, index) => (
                  <MyStacksCard
                     key={index}
                     image={item.images}
                     index={index}
                     website={item.website}
                     title={item.title}
                     likes={item.likes.length}
                     comments={item.comment.length}
                     id={item.id}
                     status={item.published}
                  />
               ))}
            </div>

         </div>
      </div>
   )
}

export default myStacks

