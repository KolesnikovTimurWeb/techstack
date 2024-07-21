
"use client"
import Button from '@/components/ui/Button'
import styles from '@/styles/SignIn.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

const schema = z.object({
   email:z.string().email(),
   password:z.string().max(50),
})

type FormFields = z.infer<typeof schema>

const SignIn = () => {
   const {register,
      handleSubmit,
      formState:{errors,isSubmitting},

   } = useForm<FormFields>({resolver:zodResolver(schema)})



      const onSubmit:SubmitHandler<FormFields> = async(data) =>{
         console.log("SIGN")
         const signInData = await signIn('credentials' , {
            email:data.email,
            password:data.password,
            redirect:false
         })
         if(signInData?.error){
            console.log(signInData.error)
         }else{
            redirect('/')
         }
         console.log(signInData)
      }


  return (
    <div className={styles.signIn}>
      <div className="container">

         <h2>Sign in</h2>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.signIn_form}>

            <div className={styles.signIn_input}>
               <label htmlFor="email">Email</label>
               <input {...register("email")} type="text" id='email' name='email' placeholder='email' />
               {errors.email && (<span>{errors.email.message}</span>)}

            </div>
            <div className={styles.signIn_input}>
               <label htmlFor="password">Password</label>
               <input {...register("password")} type="password" id='password' name='password' placeholder='password' />
            </div>
            <button type='submit'>Sign In</button>
         </form>
      </div>
    </div>
  )
}

export default SignIn
