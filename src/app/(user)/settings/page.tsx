"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Main.module.scss'
import { useSession } from 'next-auth/react'
import prisma from '@/lib/prisma'
import { toast } from 'react-toastify'
import { getUser, upadteUser } from '@/lib/actions'
import { redirect } from 'next/navigation'
import ImageUploadButton from '@/components/ImageUploadButton'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Spinner from '@/components/ui/Spinner'
import avatar from '@/assets/icons/avatar.svg'


const schema = z.object({
   username: z.string().max(60).min(10),
   developer: z.string().max(120).min(10)

})


type SettingsFields = z.infer<typeof schema>



export default function SettingsPage() {
   const userUsername = ''
   const userDeveloper = ''
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting }
   } = useForm<SettingsFields>({
      resolver: zodResolver(schema)
   })
   if (userUsername === null) {
      redirect('/sign-in')
   }
   const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");

   const handleLogoUpload = (url?: string) => {
      if (url) {
         setUploadedLogoUrl(url);
      } else {
      }
   };


   const onSubmit: SubmitHandler<SettingsFields> = async (data) => {
      if (data.username === userUsername && data.developer === userDeveloper && uploadedLogoUrl === "") {
         setError('developer', { message: "Didn't change" })
         toast.error("Didn't change anything")
      }

      const updateuser = upadteUser({
         image: uploadedLogoUrl,
         username: data.username,
         developer: data.developer,
      })
   }
   return (
      <div className={styles.setting}>
         <div className="container">


         </div>
      </div>
   )
}

