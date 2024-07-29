"use client"
import React, { Suspense, useRef, useState } from 'react'
import styles from '@/styles/Stacks.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import StackCardImage from './StackCardImage'
import heartIcon from '@/assets/icons/heart.svg'
import heartIconActive from '@/assets/icons/heart-active.svg'
import commentIcon from '@/assets/icons/comments.svg'
import shareIcon from '@/assets/icons/share.svg'
import { relativeDate } from '@/lib/utils'
import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'


interface StackCardProps {
   title: String,
   languages: any,
   image: string,
   userId: string,
   commentLength: number,
   likes: any,
   id: string,
   date: any
}

const StackCard = ({ title, languages, image, userId, commentLength, likes, id, date }: StackCardProps) => {
   const [loading, setLoading] = useState(true)
   const likeBoolean = likes?.findIndex((item: any) => item.userId === userId)
   const [currentDomain, setCurrentDomain] = useState('');
   const handleGetDomain = () => {
      setCurrentDomain(window.location.origin);
   };

   const counter = useRef(0);
   const imageLoaded = () => {
      counter.current += 1;
      if (counter.current >= 2) {
         setLoading(false);
      }
   }
   const copyToClipboard = async (text: string) => {
      try {
         handleGetDomain()
         await navigator.clipboard.writeText(`${currentDomain}/${text}`);
         toast.success("Link Copied")
      } catch (error) {
      }
   };


   return (
      <div className={styles.stacks_card}>
         <Link href={`/stack/${id}`} className={styles.stacks_card_text}>
            {loading ? (
               <span className={styles.stacks_cardSkeleton}></span>
            ) : (
               <Image onLoad={imageLoaded} src={image} alt='image' width={50} height={50} />
            )}
            <div >
               <h2>{title}</h2>
               <div className={styles.stacks_card_image}>
                  {languages.map((stack: string, index: number) => (
                     <StackCardImage key={index} image={stack} />

                  ))}
               </div>

            </div>
         </Link>
         <div className={styles.stacks_card_actions}>
            <Link href={`/stack/${id}`}><Image onLoad={imageLoaded} src={likeBoolean !== -1 ? heartIconActive : heartIcon} width={24} height={24} alt='icon' /> {likes?.length}</Link>
            <Link href={`/stack/${id}`}><Image onLoad={imageLoaded} src={commentIcon} width={24} height={24} alt='icon' /> <span>{commentLength}</span></Link>
            <button onClick={() => copyToClipboard(`stack/${id}`)}><Image onLoad={imageLoaded} src={shareIcon} width={24} height={24} alt='icon' />Share</button>
         </div>

         <div className={styles.stacks_card_date}>
            <span>{relativeDate(date)}</span>
         </div>
      </div>



   )
}

export default StackCard
