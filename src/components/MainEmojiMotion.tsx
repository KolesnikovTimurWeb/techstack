"use client"
import { motion } from "framer-motion";

import Image from "next/image"

const MainEmojiMotion = ({image ,top,left , index}: {image:any ,top:number , left:number , index:number}) => {
  return (
    <motion.div
      initial={{scale:0}}
      animate={{scale:1}}
      transition={{delay: index * .2, ease:"easeInOut"}}
    >
      <Image style={{position:'absolute' , top: `${top}%` , left:`${left}%`}} src={image} alt="emoji" width={50} height={50}/>
    </motion.div>
  )
}

export default MainEmojiMotion
