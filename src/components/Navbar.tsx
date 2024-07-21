"use client"
import styles from "@/styles/Main.module.scss"
import logo from "@/assets/logo.svg"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import Button from "./ui/Button"
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
        <motion.div 
        initial={{scale:0, y:80}}
        transition={{duration:.2 , ease: "easeInOut",}}
        animate={{ scale:1 , y:0}}
        >
          <nav className="container" style={{display:"flex"}}>
          <div className={styles.navbar_logo}>
                <Image src={logo} alt="logo" width={40} height={40}/>
                <Link href={'/'}>TechStach</Link>
          </div>
          <div className={styles.navbar_navigation}>
              <Link href={'/stacks'}>Stacks</Link>
              <Link href={'/stacks'}>Community</Link>
              <Button color="white" size="sm">Sign Up</Button>
          </div>
        </nav>
        </motion.div>

    </header>
  )
}

export default Navbar