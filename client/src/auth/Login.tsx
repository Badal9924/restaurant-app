import { Loader2, Lock, Mail } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom";
// import { LoginInputState, userLoginSchema } from "../schema/UserSchema";
import { useUserStore } from "../store/useUserStore";


function Login() {
  const [LoginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });

  const {loading,login} = useUserStore();

  // const [errors, setErrors] = useState({});

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await login(LoginCredentials);
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="w-full max-w-md max-sm:w-[86%]" onSubmit={submitHandler}>

        <div className="mb-4 flex justify-center">
          <h1 className="font-bold text-2xl">Login</h1>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              name="email"
              value={LoginCredentials.email}
              placeholder="Email"
              onChange={changeHandler}
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Mail className="absolute top-2 left-3 text-orange" />
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={LoginCredentials.password}
              onChange={changeHandler}
              placeholder="Password..."
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Lock className="absolute top-2 left-3 text-orange" />
          </div>
        </div>

        <div className="mb-3">
          {
            loading ? <Button disabled type="submit" className="w-full bg-orange hover:bg-hoverOrange text-xl">
              <Loader2 className="mr-4 animate-spin" /> Please Wait
            </Button> :
              <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange text-xl max-sm:text-[17px]">Login</Button>
          }

        </div>
        <div className="text-center mb-5">
            <Link to="/forgotPassword" className="text-blue-700 hover:text-blue-900 font-semibold hover:underline text-xl">Forgot Password</Link>
        </div>

        <hr className="border-solid border-slate-400 mb-5"></hr>

        <p className="mt-2 text-xl text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-700 hover:text-blue-900 font-semibold hover:underline ml-2">
            Signup
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Login