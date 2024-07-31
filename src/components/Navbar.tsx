import styles from "@/styles/Main.module.scss"
import logo from "@/assets/logo.svg"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import Button from "./ui/Button"
import { motion } from "framer-motion";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getUser } from "@/lib/actions"
import Menu from "./Menu"
import { useSession } from "next-auth/react"
import CustomMotionDiv from "./CustomMotionDiv"
import prisma from "@/lib/prisma"



const Navbar = async () => {
  const session = await getServerSession(authOptions)
  let username = session?.user.username
  // @ts-ignore
  let userId = session?.user.userId

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  const userImage = user?.image
  return (
    <header className={styles.navbar}>
      <CustomMotionDiv
        initial={{ scale: 0, y: 80 }}
        transition={{ duration: .2, ease: "easeInOut", }}
        animate={{ scale: 1, y: 0 }}
      >
        <nav className="container" style={{ display: "flex" }}>
          <div className={styles.navbar_logo}>
            <Image src={logo} alt="logo" width={40} height={40} />
            <Link href={'/'}>TechStach</Link>
          </div>
          <div className={styles.navbar_navigation}>
            <a className={styles.navbar_hidden} href={'/stacks'}>Stacks</a>
            <Link className={styles.navbar_hidden} href={'/my-stacks'}>My Stacks</Link>

            {username && (
              <Menu userImage={userImage} />

            )}
            {!username && (
              <Button color="white" link="/sign-up" size="sm">Sign Up</Button>
            )}
          </div>
        </nav>
      </CustomMotionDiv>

    </header>

  )
}

export default Navbar
