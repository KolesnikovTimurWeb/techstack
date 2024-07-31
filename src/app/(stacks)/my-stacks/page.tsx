import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import styles from '@/styles/Main.module.scss'
import MyStacksCard from '@/components/MyStackCard'
import Image from 'next/image'
import plusIcon from "@/assets/icons/plus.svg"
import Link from 'next/link'

const myStacks = async () => {
   const user = await getServerSession(authOptions)
   // @ts-ignore 
   const userId = user?.user.userId
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
               <Link href={'/new-stack'} className={styles.myStacks_createdStack}>
                  <Image src={plusIcon} width={50} height={50} alt='plusIcon' />
                  <h2>Create new stack</h2>
               </Link>
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

