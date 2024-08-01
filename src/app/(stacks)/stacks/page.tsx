import React from 'react'
import styles from '@/styles/Stacks.module.scss'
import StacksFilter from '@/components/StacksFilter'
import StackCard from '@/components/StackCard'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stacksArray } from '../../../../stacks'
import { Prisma } from "@prisma/client";
import Link from 'next/link'
import Pagination from '@/components/Pagination'
interface PageProps {
  searchParams: {
    q?: string;
    req?: string;
    select?: string;
    remote?: string;
    page?: Number,
  },
}

const Stacks = async ({
  searchParams,
}: PageProps) => {
  const { q, req, select, remote, page = 1 } = searchParams;
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
  const selectedLanguages = select ? select?.split(',') : stackNames;
  const stacksPerPage = 6;
  // @ts-ignore
  const skip = (page - 1) * stacksPerPage;

  const stacks = await prisma.stacks.findMany({
    take: stacksPerPage,
    skip,
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
    orderBy: { createdAt: "desc" },
    include: {
      comment: true,
      likes: true,

    },


  })

  const countPromise = prisma.stacks.count({
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
    orderBy: { createdAt: "desc" },
  });
  const [jobs, totalResults] = await Promise.all([stacks, countPromise]);

  return (
    <div className={styles.stacks}>
      <div className="container">
        <div className={styles.stacks_block}>
          <div className={styles.stacks_card_block}>
            {stacks.length > 0 && stacks.map(({ title, languages, images, comment, likes, id, createdAt }) => (
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
            {stacks.length === 0 && (
              <div>
                <h3>No Stacks was found</h3>
              </div>
            )}
            <Pagination
              req={req}
              select={select}
              page={page}
              totalPages={Math.ceil(totalResults / stacksPerPage)}
            />
          </div>
          <div className={styles.stacks_form}>
            <StacksFilter req={req} select={select} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stacks

