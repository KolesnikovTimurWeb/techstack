
"use client"
import styles from '@/styles/SignIn.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
   email:z.string().email(),
   password:z.string().max(50),
   username:z.string().max(50),
})


type FormFields = z.infer<typeof schema>

const SignUp = () => {
   const {register,
      handleSubmit,
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

      if(response.ok){
       console.log("GOOD")
      }
      console.log(response)
    }


  return (
    <div className={styles.signIn}>
      <div className="container">

         <h2>Sign Up</h2>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.signIn_form}>
         <div className={styles.signIn_input}>
               <label htmlFor="username">Username</label>
               <input {...register("username")} type="text" id='username' name='username' placeholder='username' />
               {errors.username && (<span>{errors.username.message}</span>)}
            </div>
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

export default SignUp
