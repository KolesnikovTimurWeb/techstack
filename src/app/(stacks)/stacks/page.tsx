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
  const selectedLanguages = Array.isArray(select) ? select : stackNames;
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
            <StacksFilter />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stacks

interface PaginationProps {
  totalPages: number;
  req?: string;
  select?: string;
  page?: Number,
}

function Pagination({
  totalPages,
  req,
  select,
  page,
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParamsUrl = new URLSearchParams({
      req: `${req || ''}`,
      select: `${select || ''}`,
      page: `${page}`,

    });

    return `/stacks?${searchParamsUrl.toString()}`;
  }

  return (
    <div className={styles.pagination}>

      {totalPages > 1 && (
        <div>
          {Number(page) != 1 ? (
            <Link
              href={generatePageLink(Number(page) - 1)}
            >
              Previous page
            </Link>
          ) : (
            <div>

            </div>
          )}



          <span >
            Page {Number(page)} of {totalPages}
          </span>
          {Number(page) != totalPages ? (
            <Link
              href={generatePageLink(Number(page) + 1)}

            >
              Next page
            </Link>
          ) : (
            <div>

            </div>
          )}
        </div>

      )}
    </div>
  );
}