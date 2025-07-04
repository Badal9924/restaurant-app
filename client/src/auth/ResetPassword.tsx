import { Link, useParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Loader2, Lock } from "lucide-react"
import { Input } from "../components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { useUserStore } from "../store/useUserStore"

function ResetPassword() {
  const { resetPasswordCall,loading } = useUserStore();
  const { token } = useParams();
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: ""
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPassword((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (resetPassword.password !== resetPassword.confirmPassword) {
      return
    }
    await resetPasswordCall(token, resetPassword.password);
  }


  return (
    <div className="min-h-screen flex justify-center items-center">
      <form action="" className="w-full max-w-md max-sm:w-[86%]" onSubmit={submitHandler}>
        <h1 className="text-center font-bold text-2xl">Reset Password</h1>
        <p className="text-center text-[18px]">
          Enter your new Password to reset old one
        </p>
        <div className="mb-6 mt-4">
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={resetPassword.password}
              placeholder="Enter your New Password..."
              onChange={changeHandler}
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Lock className="absolute top-2 left-3 text-orange" />

            {/* errors && <p className="absolute text-sm text-red-600">{errors.email}</p> */}

          </div>
        </div>

        <div className="mb-6 mt-4">
          <div className="relative">
            <Input
              type="password"
              name="confirmPassword"
              value={resetPassword.confirmPassword}
              placeholder="Confirm your New Password..."
              onChange={changeHandler}
              className="pl-[45px] text-xl focus-visible:ring-1 focus:border-none border-slate-400 max-sm:text-[15px]" />
            <Lock className="absolute top-2 left-3 text-orange" />

            {/* errors && <p className="absolute text-sm text-red-600">{errors.email}</p> */}

          </div>
        </div>
        {
          loading ? <Button disabled type="submit" className="w-full bg-orange hover:bg-hoverOrange text-xl">
            <Loader2 className="mr-4 animate-spin" /> Please Wait
          </Button> : <Button className="w-full bg-orange hover:bg-hoverOrange text-xl max-sm:text-[17px]">Update Your Password</Button>

        }
        {/* <Button disabled type="submit" className="w-full bg-orange hover:bg-hoverOrange text-xl">
              <Loader2 className="mr-4 animate-spin" /> Please Wait
            </Button> */}
        <p className="text-xl mt-4 text-center">
          Back to <Link to="/login" className="text-blue-700 hover:text-blue-900 font-semibold hover:underline text-xl">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default ResetPassword