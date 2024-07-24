
"use client"
import styles from '@/styles/SignIn.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ClipLoader } from 'react-spinners'

const schema = z.object({
   email:z.string().email(),
   password:z.string().max(50),
   username:z.string().max(50),
})


type FormFields = z.infer<typeof schema>

const SignUp = () => {
   const {data:session} = useSession()
   const router = useRouter()

   if(session?.user.username){
      router.push('/')
      toast.error("You are already logged",{
         toastId: 'success1',
     })
   }
   const {register,
      handleSubmit,
      setError,
      formState:{errors,isSubmitting},

   } = useForm<FormFields>({resolver:zodResolver(schema)})

   const onSubmit:SubmitHandler<FormFields> = async(data) =>{
      const response =  await fetch('/api/user' , {
       method:"POST",
       headers:{
             "Content-Type":'application/json'
       },
       body:JSON.stringify({
          username:data.username,
          email:data.email,
          password:data.password,
       })
      })
      if(response.status === 419){
         setError('email', {message:"Email already exists"})
      }
      if(response.status === 409){
         setError('username', {message:"Username already exists"})
      }
      if(response.ok){
       toast.success("Your are registered")
       router.push("/sign-in")
      }
    }


  return (
    <div className={styles.signIn}>
      <div className="container">

         <h2>Sign Up</h2>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.signIn_form}>
         <div className={styles.signIn_input}>
               <label htmlFor="username">Username</label>
               <input {...register("username")} type="text" id='username' name='username' placeholder='username' />
               {errors.username && (<span className={styles.signIn_error}>{errors.username.message}</span>)}
            </div>
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
         </form>
      </div>
    </div>
  )
}

export default SignUp
