import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import  * as z from "zod"
import Loader from "@/components/ui/shared/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


export default function SignupForm() {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoader } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })



  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign Up Failed. Please try again later",


      })
    }
    const session = await signInAccount(
      {
        email: values.email,
        password: values.password,
      }
    );

    if (!session) {
      return toast({
        title: "Sign In Failed. Please try again later",
      })
    }
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign In Failed. Please try again later",
      })
    }
  }

  return (

    <Form {...form}>
      <div className="sm:w-300  flex-center flex-col">
        <img src="/assets/images/newLogo.png" alt="logo" />
        <h2 className="h3-bold md:h2-bold sm:pt-2">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-0,1">
          To use Snapgram, please enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex
        flex-col gap-3 w-full mt-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input"{...field} />
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
                  <Input type="text" className="shad-input"{...field} />
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
                  <Input type="email" className="shad-input"{...field} />
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
                  <Input type="password" className="shad-input"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-cnter mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-bold-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>

  )
}