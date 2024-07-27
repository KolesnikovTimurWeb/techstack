import React from 'react'
import styles from '@/styles/Stacks.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import StackCardImage from './StackCardImage'
import heartIcon from '@/assets/icons/heart.svg'
import commentIcon from '@/assets/icons/comments.svg'
import shareIcon from '@/assets/icons/share.svg'
import { relativeDate } from '@/lib/utils'


interface StackCardProps {
   title: String,
   languages: any,
   image: string,
   commentLength: number,
   likesLength: number,
   id: string,
   date: any
}

const StackCard = ({ title, languages, image, commentLength, likesLength, id, date }: StackCardProps) => {

   return (
      <Link href={`/stack/${id}`} className={styles.stacks_card}>
         <div className={styles.stacks_card_text}>
            <Image src={image} alt='image' width={50} height={50} />
            <div>
               <h2>{title}</h2>
               <div className={styles.stacks_card_image}>
                  {languages.map((stack: string) => (
                     <StackCardImage image={stack} />

                  ))}
               </div>

            </div>
         </div>
         <div className={styles.stacks_card_actions}>
            <p><Image src={heartIcon} width={24} height={24} alt='icon' /> {likesLength}</p>
            <p><Image src={commentIcon} width={24} height={24} alt='icon' /> <span>{commentLength}</span></p>
            <p><Image src={shareIcon} width={24} height={24} alt='icon' />Share</p>
         </div>

         <div className={styles.stacks_card_date}>
            <span>{relativeDate(date)}</span>
         </div>
      </Link>
   )
}


export default StackCard
