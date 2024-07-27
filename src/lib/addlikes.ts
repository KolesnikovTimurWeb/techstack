"use client"

import { useState } from "react"

export const addLikes = ({boolean}:{boolean:true | false}) => {
   const [likes,setLikes] = useState(10)
   const [liked,setLiked] = useState(boolean)
   if (liked === false) {
      setLikes(prev => prev + 1)
    } else {
      setLikes(prev => prev - 1)

    }
    return likes
 }
