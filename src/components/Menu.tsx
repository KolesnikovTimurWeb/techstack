"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from "@/styles/Main.module.scss"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import avatar from '@/assets/icons/avatar.svg'
import prisma from '@/lib/prisma'

interface MenuProps {
   userImage?: any
}
const Menu = ({ userImage }: MenuProps) => {

   const [menu, setMenu] = useState(false)

   const ref = useRef<HTMLInputElement>(null)

   useEffect(() => {
      const handleClickOutside = (event: any) => {
         if (ref.current && !ref.current.contains(event.target)) {
            setMenu(false);
         }
      };

      if (menu) {
         document.addEventListener('mousedown', handleClickOutside);
      } else {
         document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [menu, setMenu]);

   return (
      <div ref={ref} className={styles.navbar_menu}>
         <div onClick={() => setMenu(!menu)} className={styles.navbar_menu_avatar}>
            <Image src={userImage || avatar} alt='avatar' width={40} height={40} />
         </div>
         {menu && (
            <div className={styles.navbar_menu_block}>
               <div className={styles.navbar_menu_user}>
                  <Image src={userImage || avatar} width={40} height={40} alt='user Image' />
               </div>
               <a className={styles.navbar_hidden} href={'/stacks'}>Stacks</a>
               <Link className={styles.navbar_hidden} href={'/my-stacks'}>My Stacks</Link>
               <Link href={'/new-stack'}>
                  Create new Stack
               </Link>
               <Link href={'/settings'}>
                  Settings
               </Link>
               <button className={styles.navbar_signOut} onClick={() => signOut({
                  redirect: true,
                  callbackUrl: '/'
               })}>Sign Out</button>
            </div>
         )}

      </div>
   )
}

export default Menu
