import React from 'react'
import styles from '@/styles/Stacks.module.scss'
import StacksFilter from '@/components/StacksFilter'
import StackCard from '@/components/StackCard'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stacksArray } from '../../../../stacks'
import { Prisma } from "@prisma/client";
interface PageProps {
  searchParams: {
    q?: string;
    req?: string;
    select?: string;
    remote?: string;
    page?: string;
  };
}

const Stacks = async ({
  searchParams: { q, req, select, },
}: PageProps) => {

  const searchString = req
    ?.split(" ")
    .filter((word: any) => word.length > 0)
    .join(" & ");

  const user = await getServerSession(authOptions)
  // @ts-ignore 
  const userId = user?.user.userId

  const searchFilter: Prisma.StacksWhereInput = searchString
    ? {
      OR: [
        { title: { search: searchString } },
      ],
    }
    : {};
  const stackNames = [...Object.keys(stacksArray)]
  const selectedLanguages = Array.isArray(select) ? select : stackNames;
  const stacks = await prisma.stacks.findMany({

    where: {
      AND: [
        searchFilter,
        {
          languages: {
            hasSome: selectedLanguages
          }
        },
      ],
    },

    include: {
      comment: true,
      likes: true,

    },

  })




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
                userId={userId}
                commentLength={comment.length}
                likes={likes}
                id={id}
                key={id}
                date={createdAt}
              />
            ))}

          </div>
          <div className={styles.stacks_form}>
            <StacksFilter />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stacks
