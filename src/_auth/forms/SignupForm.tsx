import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toaster } from "@/components/ui/toaster";
import { Link } from 'react-router-dom';
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { singupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { title } from "process";


const SignupForm = () => {
  //declaring toast as a hook
  const { toast } = useToast();
  
  //here createuserAccount is rename of mutateAsync function save for loading
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();

 // 1. Define your form.
 const form = useForm<z.infer<typeof singupValidation>>({
  resolver: zodResolver(singupValidation),
  defaultValues: {
    name: '',
    username: "",
    email: '',
    password: '',
  },
})

// 2. Define a submit handler.
//This is async funtion and we have to specify it (because it take same time)
//we will create our user using Appwrite
async function onSubmit(values: z.infer<typeof singupValidation>) {
  //New user will be added
  const newUser = await createUserAccount(values);

  //User create hone ke baad kya hoga, we will define below
  if(!newUser) {
    return  toast({
      title: 'Sign up failed. Please try again.',
    })
  }

  const session = await signInAccount( {
    email: values.email,
    password: values.password,
  })  

  if(!session) {
    return toast({
      title: 'Sign in failed. Please try again.'
    })
  }
}

  return (
    //on small devices(sm) width is 420 flex-col - means elements come one below each other
    <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/applogo.jpg" alt = "logo" width={80}/>

      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">To use FrndZone, please enter your details</p>
    

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isCreatingUser ? (
          <div className="flex-center gap-2">
           <Loader/> Loading...
          </div>
        ): "Sign up"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account ?
          <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
       
      </form>
    </div>
    </Form>
  )
}

export default SignupForm
