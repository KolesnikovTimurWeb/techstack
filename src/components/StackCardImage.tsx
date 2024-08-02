"use client"
import { stacksArray } from "../../stacks.js"

import Image from "next/image"

const StackCardImage = ({ image }: { image: string }) => {
  return <Image src={stacksArray[image as keyof typeof stacksArray].image} width={40} height={40} alt="image" />
}

export default StackCardImage
