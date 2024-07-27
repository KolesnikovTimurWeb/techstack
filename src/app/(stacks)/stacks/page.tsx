import React, { useEffect } from 'react'
import styles from '@/styles/Stacks.module.scss'
import StacksFilter from '@/components/StacksFilter'
import StackCard from '@/components/StackCard'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


const Stacks = async () => {


  const user = await getServerSession(authOptions)
  // @ts-ignore 
  const userId = user?.user.userId
  const stacks = await prisma.stacks.findMany({

    where: {
      published: true
    },
    include: {
      comment: true,
      likes: true,
    }
  })

  const likesFunc = (likes: any) => {
    const like = likes.map((item: any) => item.userId === userId)
    console.log(like)
    return 0
  }

  return (
    <div className={styles.stacks}>
      <div className="container">
        <div className={styles.stacks_block}>
          <div className={styles.stacks_card_block}>
            {stacks.map(({ title, languages, images, comment, likes, id, createdAt }) => (
              <StackCard
                title={title}
                languages={languages}
                image={images}
                commentLength={comment.length}
                likesLength={likes.length}
                id={id}
                key={id}
                date={createdAt}
              />
            ))}
          </div>
          <div>

            <StacksFilter />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stacks
