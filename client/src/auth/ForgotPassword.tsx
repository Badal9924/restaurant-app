import { ChangeEvent, FormEvent, useState } from "react"
import { Input } from "../components/ui/input"
import { Loader2, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

function ForgotPassword() {
  const { forgotPassword, loading } = useUserStore();
  const [forgotData, setForgotData] = useState({
    email: ""
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await forgotPassword(forgotData.email);
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form action="" className="w-full max-w-md max-sm:w-[86%]" onSubmit={submitHandler}>
        <h1 className="text-center font-bold text-2xl">Forgot Password</h1>
        <p className="text-center text-[18px]">
          Enter your email address to reset your password
        </p>
        <div className="mb-6 mt-4">
          <div className="relative">
            <Input
              type="text"
              name="email"
              value={forgotData.email}
              placeholder="Email"
              onChange={changeHandler}
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Mail className="absolute top-2 left-3 text-orange" />

            {/* errors && <p className="absolute text-sm text-red-600">{errors.email}</p> */}

          </div>
        </div>

        {
          loading ?
           <Button disabled type="submit" className="w-full bg-orange hover:bg-hoverOrange text-xl">
              <Loader2 className="mr-4 animate-spin" /> Please Wait
            </Button>
            : <Button className="w-full bg-orange hover:bg-hoverOrange text-xl max-sm:text-[17px]">Send Reset Link</Button>

        }

        <p className="text-xl mt-4 text-center">
          Back to <Link to="/login" className="text-blue-700 hover:text-blue-900 font-semibold hover:underline text-xl">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default ForgotPassword