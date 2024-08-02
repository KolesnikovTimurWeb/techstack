
import React from 'react'
import styles from "@/styles/Stacks.module.scss"
import prisma from '@/lib/prisma'
import { useParams } from 'next/navigation';

import Parser from 'html-react-parser';
import arrow from '@/assets/arrow-return.svg';
import { relativeDate } from '@/lib/utils';
import ActionStack from '@/components/ActionStack';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import StackCardImage from '@/components/StackCardImage';
import Image from 'next/image';

const Stack = async ({ params }: { params: any }) => {
  let id = params.id
  const user = await getServerSession(authOptions)
  // @ts-ignore 
  const userId = user?.user.userId
  let stack = await prisma.stacks.findUnique({
    where: {
      id
    },
    include: {
      comment: true,
      likes: true,
    }
  })
  let userImg
  if (!userId) {

  } else {

    userImg = await prisma.user.findUnique({
      where: {
        id: userId
      },
    })
  }

  const likeBoolean = stack?.likes.findIndex((item) => item.userId === userId)
  const htmlParse = stack?.description
  return (
    <div className={styles.stack}>
      <div className="container">
        <div className={styles.stack_block}>
          <a className={styles.stack_link} href='/stacks'>
            <Image src={arrow} width={24} height={24} alt='return' />
            <span>return</span>
          </a>
          <h2>{stack?.title}
          </h2>
          <Link target='_blank' href={`${stack?.website}`}>{stack?.website}</Link>
          <span>{relativeDate(stack?.createdAt as Date)}</span>
          <div>
            {stack?.languages.map((stack: string, index: number) => (
              <StackCardImage key={index} image={stack} />
            ))}
          </div>
          <div className={styles.stack_parser} >{Parser(htmlParse as any)}</div>

          <div className={styles.stack_action}>
            <ActionStack userImage={userImg?.image} username={userImg?.username} stackId={id} userId={userId} likes={stack?.likes.length} likeBoolean={likeBoolean !== -1 ? true : false} coments={stack?.comment.reverse()} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Stack
