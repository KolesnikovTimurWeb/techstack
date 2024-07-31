import React from 'react'
import styles from "@/styles/Main.module.scss"
import Image from 'next/image'
import logo from "@/assets/logo.svg"
import Link from 'next/link'

const Footer = () => {
   return (
      <div className={styles.footer}>
         <div className="container">
            <div className={styles.footer_logo}>
               <Image src={logo} alt="logo" width={40} height={40} />
               <Link href={'/'}>TechStach</Link>
            </div>
            <div className={styles.footer_navigation}>
               <a href='/stacks'>Stacks</a>
               <Link href='/my-stacks'>My Stacks</Link>
               <Link href='/settings'>Settings</Link>
            </div>
            <div className={styles.footer_rights}>
               © 2024 Flow Jobs, Inc. All rights reserved.
            </div>
         </div>
      </div>
   )
}

export default Footer
