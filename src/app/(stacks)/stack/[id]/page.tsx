
import React from 'react'
import styles from "@/styles/Stacks.module.scss"
import prisma from '@/lib/prisma'
import { useParams } from 'next/navigation';

import Parser from 'html-react-parser';
import { relativeDate } from '@/lib/utils';
import ActionStack from '@/components/ActionStack';

const Stack = async ({params} : {params:any}) => {
   let id = params.id

   const stack = await prisma.stacks.findUnique({
      where:{
        id
      },
      include:{
        comment:true,
        likes:true,
      }
   })
   console.log(stack)
   const htmlParse = stack?.description
  return (
    <div className={styles.stack}>
      <div className="container">
         <div className={styles.stack_block}>
             <h2>{stack?.title}
               <span>{relativeDate(stack?.createdAt as Date)}</span>
             </h2>
            <div className={styles.stack_parser} >{Parser(htmlParse as any)}</div>

            <div className={styles.stack_action}>
              <ActionStack stackId={id} likes={stack?.likes.length} coments={stack?.comment}/>
            </div>
         </div>
       
      </div>
    </div>
  )
}

export default Stack
