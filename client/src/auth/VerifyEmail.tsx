import React, { FormEvent, useEffect, useRef, useState } from "react"
import { Input } from "../components/ui/input"
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

function VerifyEmail() {
  const { loading, verify_Email } = useUserStore();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const [completeOtp, setCompleteOtp] = useState({
    verificationCode : ""
  });
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    // allow only one :)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    // Submit trigger :) ( Combining all the otp )
    const fullOtp = newOtp.join("");
    setCompleteOtp({ verificationCode: fullOtp });
    // moving to the input field if current input field is filled )
    if (value && index < otp.length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleClick = (index: number) => {
    inputRef.current[index].setSelectionRange(1, 1);
  }

  const handleKeyDown = (index: number, e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRef.current[index - 1]) {
      inputRef.current[index - 1].focus();
    }
  }

  const verifyEmailSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await verify_Email(completeOtp);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // focusing the first one :)
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, [])

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="max-w-md w-full border-solid border-2 border-zinc-300 px-[15px] py-[15px] rounded-sm">
        <div>
          <h1 className="text-center text-2xl font-semibold">Verify your email</h1>
          <p className="text-center text-[18px]">Enter the 6 digit code sent to your emailaddress</p>
        </div>
        <form action="" onSubmit={verifyEmailSubmitHandler}>
          <div className="flex justify-center gap-5 mt-3">
            {
              otp.map((character: string, index: number) => {
                return <Input
                  key={index}
                  type="text"
                  ref={(element) => (inputRef.current[index] = element)}
                  value={character}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                  onClick={() => handleClick(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-11 w-11 focus-visible:ring-2 focus:border-none border-slate-500 text-center text-xl"
                />
              })
            }
          </div>
          {
            loading ? <Button disabled className="bg-orange hover:bg-hoverOrange mt-6 w-full text-xl">
              <Loader2 className="mr-3 animate-spin" />
              Please wait
            </Button> : <Button className="bg-orange hover:bg-hoverOrange mt-6 w-full text-xl">Verify</Button>
          }
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail;