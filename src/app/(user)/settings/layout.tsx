
import { useSession } from "next-auth/react"
import Settings from "./page"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getUser } from "@/lib/actions"

const layout = async () => {
   const user = await getUser()


  return (

    <div>
      <Settings user={user}/>
    </div>
  )
}

export default layout
