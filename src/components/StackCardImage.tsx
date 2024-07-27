"use client"
import {stacks} from "../../stacks.js"

import Image from "next/image"

const StackCardImage = ({image}:{image:string}) => {
  return <Image src={stacks[image as keyof typeof stacks].image} width={32} height={32} alt="image"/>
}

export default StackCardImage
