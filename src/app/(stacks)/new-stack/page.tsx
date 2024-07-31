"use client"
import React, { useCallback, useState } from 'react'
import styles from "@/styles/Stacks.module.scss"
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { stripHtml } from "string-strip-html";
import prisma from '@/lib/prisma'
import { createStack } from '@/lib/actions'
import { useSession } from 'next-auth/react'
import { ImagesUploader } from '@/components/ImagesUploader'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { stacksArray } from "../../../../stacks.js"
import { toast } from 'react-toastify'
import { link } from 'fs'
import Link from 'next/link.js'
import LoaderBars from '@/components/ui/LoaderBars'
import Spinner from '@/components/ui/Spinner'


const WYSIWYGEditor = dynamic(
   () => import('@/components/MyEditor'),
   { ssr: false }
)
const schema = z.object({
   title: z.string().max(60).min(10),
   description: z.string().optional(),
   languages: z.any(),
   website: z.string().min(10).optional()

})
const stackNames = [...Object.keys(stacksArray)]



type StackFields = z.infer<typeof schema>

const NewStack = () => {
   const [loadedImage, setLoadedImage] = useState(true)
   const { data: session } = useSession()
   const [steps, setSteps] = useState(1)
   const {
      register,
      handleSubmit,
      getValues,
      setError,
      setValue,
      control,
      formState: { errors, isSubmitting },
   } = useForm<StackFields>({
      resolver: zodResolver(schema)
   })

   const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");

   const handleLogoUpload = (url?: string) => {
      if (url) {
         setUploadedLogoUrl(url);
      } else {
      }
   };

   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const onSubmit: SubmitHandler<StackFields> = useCallback(async (data) => {

      if (steps === 2) {
         let desc = Number(getValues('description')?.length)
         if (desc < 100) {
            return toast.error("Minimum 100 charters")

         }
      }
      if (steps === 3 && selectedCategories.length < 1) {
         return toast.error("Add languages to your stack")

      } else {
         setValue('languages', [...selectedCategories])
      }
      if (steps === 4 && !uploadedLogoUrl) {
         return toast.error("Add Logo")

      }

      if (steps === 5) {
         const stack = await createStack({
            title: data.title,
            description: data.description,
            languages: data.languages,
            userId: session?.user.id,
            images: uploadedLogoUrl,
            website: data.website
         })
      }

      setSteps(prev => prev + 1)
   }, [steps, selectedCategories, uploadedLogoUrl])

   const previousStep = () => {
      if (steps !== 1) {
         setSteps(prev => prev - 1)
      }
   }
   const handleCategoryToggle = (category: string) => {
      if (selectedCategories.includes(category)) {
         setSelectedCategories((prevCategories) =>
            prevCategories.filter((prevCategory) => prevCategory !== category)
         );
      } else if (selectedCategories.length < 10) {
         setSelectedCategories((prevCategories) => [...prevCategories, category]);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.new_stack}>
         <div className="container">
            {steps === 1 && (
               <div className={styles.new_stack_block}>
                  <h2>Create Title for your Stack</h2>
                  <h3>Write a unique title for your stack, that's also can describe your stack post and what you did in your project. </h3>

                  <div className={styles.new_stack_input}>

                     <label htmlFor="title">Type your title</label>
                     <input type="text" {...register("title")} id='title' name='title' maxLength={60} />
                     {errors.title && (<span className={styles.new_stack_error}>{errors.title.message}</span>)}
                  </div>

               </div>
            )}
            {steps === 2 && (
               <div className={styles.new_stack_block}>
                  <h2>Write your description</h2>
                  <h3>Describe your project step-by-step. Why did you choose the stack that you used and how hard it was. Describe all your experience with it</h3>

                  <div className={styles.new_stack_input}>

                     <label htmlFor="description">Type your description</label>

                     <div className={styles.new_stack_editor}>
                        <span className={styles.new_stack_editor_loader}><LoaderBars /></span>
                        <Controller
                           render={({ field }) => <WYSIWYGEditor {...field} />}
                           name="description"
                           control={control}
                           defaultValue=""
                           rules={{
                              validate: {
                                 required: (v) =>
                                    (v && stripHtml(v).result.length > 0) ||
                                    "Description is required",
                                 maxLength: (v) =>
                                    (v && stripHtml(v).result.length <= 2000) ||
                                    "Maximum character limit is 2000",
                              },
                           }}
                        />
                     </div>

                  </div>

               </div>
            )}

            {steps === 3 && (
               <div className={styles.new_stack_block}>
                  <h2>Choose your Stack</h2>
                  <h3>You can choose the stack that you used in your project.</h3>
                  <div className={styles.new_stack_stacksBlock}>
                     {stackNames.map((item) => {
                        // Check if stacks[item] exists and has an image property
                        return (
                           <div key={item} className={selectedCategories.includes(item) ? styles.new_stack_stackButton_active : styles.new_stack_stackButton} onClick={() => handleCategoryToggle(item)}>
                              <Image
                                 key={item}
                                 src={stacksArray[item as keyof typeof stacksArray]?.image}
                                 width={24}
                                 height={24}
                                 alt='logo'
                              />
                              {item}
                           </div>


                        );
                     })}
                  </div>

               </div>
            )}
            {steps === 4 && (
               <div className={styles.new_stack_block}>
                  <h2>Choose your Logo</h2>
                  <h3>Add your project logo. Then people can see it and find your project in the search</h3>
                  {uploadedLogoUrl ? (
                     <div className={styles.new_stack_images}>
                        {loadedImage ? null : (
                           <div
                              style={{
                                 background: 'red',
                                 height: '400px',
                                 width: '400px'
                              }}
                           />
                        )}

                        <Image
                           style={loadedImage ? {} : { display: 'none' }}
                           onLoad={() => setLoadedImage(true)}
                           src={uploadedLogoUrl}
                           alt="logo"
                           width={200}
                           height={200}
                           className={styles.new_stack_loadedimage}
                        />


                     </div>
                  ) : (

                     <ImagesUploader
                        endpoint="productLogo"
                        onChange={handleLogoUpload}
                     />
                  )}
               </div>
            )}
            {steps === 5 && (
               <div className={styles.new_stack_block}>
                  <h2>Add your website url</h2>
                  <h3>You can add your main URL for your project or GitHub page URL</h3>
                  <div className={styles.new_stack_input}>
                     <input type="url" {...register("website")} id='website' name='website' placeholder='google.com' maxLength={60} />

                     {errors.website && (<span className={styles.new_stack_error}>{errors.website.message}</span>)}

                  </div>
               </div>
            )}
            {steps >= 6 && (
               <div className={styles.new_stack_congratulation}>
                  <h2>🥳Congratulations your stack has been created 🥳  </h2>
                  <Link className={styles.new_stack_button} href={'/my-stacks'}>Go to my stacks</Link>
               </div>
            )}
            {steps === 1 && (
               <button className={styles.new_stack_button} type='submit'>Next Step</button>
            )}
            {steps !== 1 && steps !== 6 && (
               <div className={styles.new_stack_buttons}>
                  <span className={styles.new_stack_button} onClick={previousStep}>Previous Step</span>
                  <button className={styles.new_stack_button} disabled={isSubmitting} type='submit'>{isSubmitting && <Spinner />}Next Step</button>
               </div>
            )}
         </div>
      </form>
   )
}

export default NewStack
