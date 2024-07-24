import React, { useState } from 'react'
import styles from "@/styles/Main.module.scss"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

interface MenuProps{
   username?:string,
   email?:string
 }
const Menu = ({username, email}:MenuProps) => {
   
   const [menu,setMenu] = useState(false)

  return (
    <div className={styles.navbar_menu}>
      <div onClick={()=> setMenu(!menu)} className={styles.navbar_menu_avatar}>

      </div>
      {menu && (
      <div className={styles.navbar_menu_block}>
            <div className={styles.navbar_menu_user}>
               <h3>{username}</h3>
               <p>{email}</p>
            </div>

         <Link href={'/new-stack'}>
            Create new Stack
         </Link>   
         <Link href={'/new-stack'}>
            Settings
         </Link>   
         <button onClick={()=> signOut({
            redirect:true,
            callbackUrl:'/'
         })}>Sign Out</button>
     </div>
      )}

    </div>
  )
}

export default Menu
