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

export const Settings = ({ user }: { user: any }) => {
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting }
   } = useForm<SettingsFields>({
      resolver: zodResolver(schema)
   })
   if (user === null) {
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
      if (data.username === user?.username && data.developer === user?.developer && uploadedLogoUrl === "") {
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

            <form onSubmit={handleSubmit(onSubmit)} className={styles.setting_details}>
               <div className={styles.setting_avatar}>
                  {uploadedLogoUrl ? (
                     <Image src={uploadedLogoUrl} width={60} height={60} alt='avatar' />

                  ) : (
                     <Image src={user?.image || avatar} width={60} height={60} alt='avatar' />
                  )}
                  <h2>{user?.username}</h2>
                  <h4>{user?.email}</h4>
                  <h3>{user?.developer}</h3>


               </div>
               <div className={styles.setting_details_block}>
                  <div className={styles.setting_input}>
                     <label htmlFor="username">Your Username</label>
                     <input {...register('username')} type='text' defaultValue={user?.username || 'username'} name='username' id='username' />
                     {errors.username && (<span className={styles.new_stack_error}>{errors.username.message}</span>)}

                  </div>
                  <div className={styles.setting_input}>
                     <label htmlFor="email">Your Email</label>
                     <input type='email' defaultValue={user?.email} name='email' disabled id='email' />
                  </div>
                  <div className={styles.setting_input}>
                     <label htmlFor="username">Your Role</label>
                     <input {...register('developer')} type='text' defaultValue={user?.developer || "Front-End Developer"} name='developer' id='developer' />
                     {errors.developer && (<span className={styles.new_stack_error}>{errors.developer.message}</span>)}

                  </div>

               </div>
               {uploadedLogoUrl ? (
                  <div>
                  </div>
               ) : (
                  <div className={styles.setting_image}>
                     <h4>Choose your Avatar Image</h4>
                     <ImageUploadButton
                        endpoint="profilePicture"
                        onChange={handleLogoUpload} />
                  </div>
               )}
               <div className={styles.setting_buttons}>
                  <button disabled={isSubmitting} type='submit'>{isSubmitting && <Spinner />}Submit</button>
               </div>
            </form>
         </div>
      </div>
   )
}


