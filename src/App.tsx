import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>

// type FormFields = {
//   email: string;
//   password: string;
// }

export const App = () => {
  const { register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    }
  } = useForm<FormFields>({
    defaultValues: {
      email: 'test@email.com'
    },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error()
      console.log(data);
    } catch (err) {
      setError("root", {
        message: 'This email is already taken'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* REACT-HOOK-FORM EXAMPLE */}
      {/* <input  {...register("email", {
        required: 'empty email',
        validate: (value) => {
          if (!value.includes('@')) {
            return 'Email must include @'
          }
          return true
        }
      })} type="text" placeholder="email" /> */}
      {/* ZOD EXAMPLE: */}
      <input type="text" placeholder="email" {...register('email')} />
      {errors.email && <div>{errors.email.message}</div>}
      {/* REACT-HOOK-FORM EXAMPLE */}
      {/* <input {...register('password', {
        required: 'empty password',
        minLength: {
          value: 8,
          message: 'Password must have at least 8 characters'
        },
      })} type="password" placeholder="password" /> */}
      {/* ZOD EXAMPLE: */}
      <input type="text" placeholder="password" {...register('password')} />
      {errors.password && <div>{errors.password.message}</div>}
      <button disabled={isSubmitting} type="submit">{isSubmitting ? 'loading...' : 'submit'}</button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  )
}