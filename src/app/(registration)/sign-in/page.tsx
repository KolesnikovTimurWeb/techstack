
"use client"
import Button from '@/components/ui/Button'
import styles from '@/styles/SignIn.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import Link from 'next/link'

const schema = z.object({
   email: z.string().email(),
   password: z.string().max(50),
})

type FormFields = z.infer<typeof schema>

const SignIn = () => {
   const { data: session } = useSession()
   const router = useRouter()
   if (session?.user.username) {
      router.push('/')
      toast.error("You are already logged", {
         toastId: 'success1',
      })
   }

   const { register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },

   } = useForm<FormFields>({ resolver: zodResolver(schema) })



   const onSubmit: SubmitHandler<FormFields> = async (data) => {
      const signInData = await signIn('credentials', {
         email: data.email,
         password: data.password,
         redirect: true
      })
      if (signInData?.status === 401) {
         setError('password', { message: "Wrong password" })
      }
      if (signInData?.error) {
         console.log(signInData.error)
      } else {
      }
   }


   return (
      <div className={styles.signIn}>
         <div className="container">

            <h2>Sign in</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.signIn_form}>

               <div className={styles.signIn_input}>
                  <label htmlFor="email">Email</label>
                  <input {...register("email")} type="text" id='email' name='email' placeholder='email' />
                  {errors.email && (<span className={styles.signIn_error}>{errors.email.message}</span>)}

               </div>
               <div className={styles.signIn_input}>
                  <label htmlFor="password">Password</label>
                  <input {...register("password")} type="password" id='password' name='password' placeholder='password' />
                  {errors.password && (<span className={styles.signIn_error}>{errors.password.message}</span>)}

               </div>
               <button type='submit' disabled={isSubmitting}>{isSubmitting && (<ClipLoader
                  color={'black'}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
               />)} Sign In</button>

               <Link href={'/sign-up'}>You don&apos;t have account?</Link>

            </form>
         </div>
      </div>
   )
}

export default SignIn
