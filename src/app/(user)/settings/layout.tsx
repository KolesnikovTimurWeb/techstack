
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getUser } from "@/lib/actions"
import Settings from "./page"

const layout = async () => {
  const user = await getUser()

  return (

    <Settings userDeveloper={user?.developer} userUsername={user?.username} userEmail={user?.email} userImage={user?.image} />
  )
}

export default layout
