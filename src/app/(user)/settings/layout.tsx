
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getUser } from "@/lib/actions"
import Settings from "./page"

const layout = async () => {
  const session = await getServerSession(authOptions)
  // @ts-ignore 
  const userSessionId = session?.user.userId
  if (!userSessionId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userSessionId
    }
  })

  return (

    <Settings userDeveloper={"user?.developer"} userUsername={"user?.developer"} userEmail={"user?.developer"} userImage={"user?.developer"} />
  )
}

export default layout
