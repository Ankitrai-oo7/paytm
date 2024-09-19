import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin(){
        return <div className="bg-slate-500 flex justify-center h-screen">
           <div className="flex flex-col justify-center">
              <div className="bg-white rounded-lg w-80 h-max text-center p-2 px-4">
              <Heading label={"Sign in"}/>
              <SubHeading label={"Enter Your credential to access your Account"}/>
              <InputBox label={"Email"} placeholder={"ankit@gmail.com"}/>
              <InputBox label={"Password"} placeholder={"123456"}/>
              <div className="pt-4">
              <Button label={"Sign in"}/>
              </div>
              <BottomWarning label={"Don't have account ?"} 
               buttonText={"Sign up"} to={"/signup"} />
              </div>
           </div>
        </div>
}