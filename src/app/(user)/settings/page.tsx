
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import SettingsPage from "@/components/SettingsPage"

const Settings = async () => {
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
  if (!user) {
    return null
  }
  const username = user?.username

  return (

    <SettingsPage userUsername={username} userEmail={user?.email} userDeveloper={user?.developer} userImage={user?.image} />
  )
}

export default Settings
