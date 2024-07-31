
import React from 'react'
import styles from "@/styles/Stacks.module.scss"
import prisma from '@/lib/prisma'
import { useParams } from 'next/navigation';

import Parser from 'html-react-parser';
import { relativeDate } from '@/lib/utils';
import ActionStack from '@/components/ActionStack';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import StackCardImage from '@/components/StackCardImage';

const Stack = async ({ params }: { params: any }) => {
  let id = params.id
  const user = await getServerSession(authOptions)
  // @ts-ignore 
  const userId = user?.user.userId
  const stack = await prisma.stacks.findUnique({
    where: {
      id
    },
    include: {
      comment: true,
      likes: true,
    }
  })
  const likeBoolean = stack?.likes.findIndex((item) => item.userId === userId)
  const htmlParse = stack?.description
  return (
    <div className={styles.stack}>
      <div className="container">
        <div className={styles.stack_block}>
          <h2>{stack?.title}
          </h2>
          <Link href={'/'}>google.com</Link>
          <span>{relativeDate(stack?.createdAt as Date)}</span>
          <div>
            {stack?.languages.map((stack: string, index: number) => (
              <StackCardImage key={index} image={stack} />
            ))}
          </div>
          <div className={styles.stack_parser} >{Parser(htmlParse as any)}</div>

          <div className={styles.stack_action}>
            <ActionStack stackId={id} userId={userId} likes={stack?.likes.length} likeBoolean={likeBoolean !== -1 ? true : false} coments={stack?.comment} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Stack
