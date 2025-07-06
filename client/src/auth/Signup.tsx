import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Loader2, Lock, Mail, PhoneCall, User } from "lucide-react"
import { Input } from "../components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { useUserStore } from "../store/useUserStore"
import toast from "react-hot-toast"

function Signup() {
  const navigate = useNavigate();
  const { signup, loading } = useUserStore();

  const [signUpCredentials, setSignUpCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: ""
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (signUpCredentials.password !== signUpCredentials.confirmPassword) {
        toast.error("Password not Match..");
        return;
      }
      await signup(signUpCredentials);
      navigate('/verifyEmail');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="w-full max-w-md max-sm:w-[86%]" onSubmit={submitHandler}>

        <div className="mb-4 flex justify-center">
          <h1 className="font-bold text-2xl">Fomato :)</h1>
        </div>

        <div className="mb-5">
          <div className="relative">
            <Input
              required
              type="text"
              name="fullName"
              value={signUpCredentials.fullName}
              placeholder="Name"
              onChange={changeHandler}
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <User className="absolute top-2 left-3 text-orange" />

          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <Input
              required
              type="text"
              name="email"
              value={signUpCredentials.email}
              placeholder="Email"
              onChange={changeHandler}
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Mail className="absolute top-2 left-3 text-orange" />

          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <Input
              required
              type="password"
              name="password"
              value={signUpCredentials.password}
              onChange={changeHandler}
              placeholder="Password..."
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Lock className="absolute top-2 left-3 text-orange" />

          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <Input
              required
              type="password"
              name="confirmPassword"
              value={signUpCredentials.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Your Password..."
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Lock className="absolute top-2 left-3 text-orange" />

          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <Input
              required
              type="text"
              name="number"
              value={signUpCredentials.number}
              onChange={changeHandler}
              placeholder="Phone Number..."
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <PhoneCall className="absolute top-2 left-3 text-orange" />

          </div>
        </div>

        <div className="mb-11">
          {
            loading ? <Button disabled type="submit" className="w-full bg-orange hover:bg-hoverOrange text-xl">
              <Loader2 className="mr-4 animate-spin" /> Please Wait
            </Button> :
              <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange text-xl max-sm:text-[17px]">Signup</Button>
          }

        </div>

        <hr className="border-solid border-slate-400 mb-5"></hr>

        <p className="mt-2 text-xl text-center">
          Already have an Account?
          <Link to="/login" className="text-blue-500 ml-2">
            Login
          </Link>
        </p>

        {/* <div className="relative flex items-center justify-center my-6">
          <span className="absolute px-2 text-gray-500 bg-white">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <button className="flex items-center justify-center w-full px-4 py-1 text-gray-700 bg-white border-2 border-solid rounded-md hover:bg-slate-200 border-slate-400 text-xl">
          <img
            src={assets.Google_Logo}
            alt="Google logo"
            className="w-6 h-6 mr-2"
          />
          Sign Up with Google
        </button> */}

      </form>
    </div>
  )
}

export default Signup