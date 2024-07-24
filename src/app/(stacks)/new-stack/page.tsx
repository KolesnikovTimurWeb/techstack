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
const WYSIWYGEditor = dynamic(
   () => import('@/components/MyEditor'),
   { ssr: false }
 )
const schema = z.object({
   title:z.string().max(60).min(10),
   description:z.string().optional(),
   languages:z.any()

})


type StackFields = z.infer<typeof schema>

const NewStack = () => {
   const {data:session} = useSession()
   const [steps,setSteps] = useState(1)
   const {
      register,
      handleSubmit,
      getValues,
      setError,
      setValue,
      control,
      formState:{errors,isSubmitting},
   } = useForm<StackFields>({
      resolver:zodResolver(schema)
   })

   const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");
  
    const handleLogoUpload = (url?: string) => {
      if (url) {
        setUploadedLogoUrl(url);
      } else {
      }
    };

   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const onSubmit:SubmitHandler<StackFields> = useCallback(async(data)=>{
      
      if(steps === 3){
         setValue('languages', [...selectedCategories])
      }
      if(steps ===5){
         const stack = await createStack({
            title:data.title,
            description:data.description,
            languages:data.languages,
            userId:session?.user.id,
            images:uploadedLogoUrl
         })
         console.log(stack)
      }
      if(steps !== 8){
         setSteps(prev => prev + 1)
      }
   },[steps,selectedCategories])


   const handleCategoryToggle = (category: string) => {
      if (selectedCategories.includes(category)) {
        setSelectedCategories((prevCategories) =>
          prevCategories.filter((prevCategory) => prevCategory !== category)
        );
      } else if (selectedCategories.length < 3) {
        setSelectedCategories((prevCategories) => [...prevCategories, category]);
      }
    };

   return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.new_stack}>
      <div className="container">
         {steps === 1 && (
            <div className={styles.new_stack_block}>
               <h2>Create Title for your Stack</h2>
               <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis possimus accusamus delectus quibusdam laudantium optio provident qui. Eveniet autem dolorum officia nobis repellat! Nobis, et! Repellat quidem facilis deleniti?</h3>
         
               <div className={styles.new_stack_input}>

               <label htmlFor="title">Type your title</label>
               <input type="text" {...register("title")} id='title' name='title' maxLength={60}/>
               {errors.title && (<span className={styles.new_stack_error}>{errors.title.message}</span>)}
               </div>
         
            </div>
      )}
      {steps === 2 && (
            <div className={styles.new_stack_block}>
               <h2>Write your description</h2>
               <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis possimus accusamus delectus quibusdam laudantium optio provident qui. Eveniet autem dolorum officia nobis repellat! Nobis, et! Repellat quidem facilis deleniti?</h3>
         
               <div className={styles.new_stack_input}>

               <label htmlFor="description">Type your description</label>
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
      )}

      {steps ===3 && (
                 <div className={styles.new_stack_block}>
                 <h2>Choose your Stack</h2>
                 <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis possimus accusamus delectus quibusdam laudantium optio provident qui. Eveniet autem dolorum officia nobis repellat! Nobis, et! Repellat quidem facilis deleniti?</h3>
                  <div onClick={()=>handleCategoryToggle('Categoru')}>Categoru</div>
                  <div onClick={()=>handleCategoryToggle('Categoru2')}>Categoru2</div>
                  <div onClick={()=>handleCategoryToggle('Categoru3')}>Categoru3</div>
                  <span onClick={()=> console.log(selectedCategories)}>CLICKKK</span>
              </div>
      )}
      {steps ===4 && (
                 <div className={styles.new_stack_block}>
                 <h2>Choose your Stack</h2>
                 <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis possimus accusamus delectus quibusdam laudantium optio provident qui. Eveniet autem dolorum officia nobis repellat! Nobis, et! Repellat quidem facilis deleniti?</h3>
                 {uploadedLogoUrl ? (
                <div className="mt-2">
                  <Image
                    src={uploadedLogoUrl}
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="rounded-md h-40 w-40 object-cover"
                  />
                </div>
              ) : (
               
                <ImagesUploader
                  endpoint="productLogo"
                  onChange={handleLogoUpload}
                />
              )}

                <span onClick={()=> console.log(uploadedLogoUrl)}>CLICK TO IMAGE</span>
              </div>
      )}
      <button type='submit'>Next sss</button>
      </div>
    </form>
  )
}

export default NewStack
