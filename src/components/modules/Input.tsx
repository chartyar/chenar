import * as React from "react";
import { FieldError } from "react-hook-form";


interface InputProps {
  type: string;
  label?: string;
  id?: string;
  placeholder?:string;
  error?:FieldError;
  hint?:string | undefined;
  icons?:React.ReactNode[]|undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, label, id,error, placeholder,icons,hint,...restProps} = props;

  const[showPassword,setShowPassword] = React.useState<boolean>(false)
  const[inputType,setInputType] = React.useState(type)


  const togglePassword = ()=>{
    if(showPassword){
      setShowPassword(false)
      setInputType("password")
    }else{
      setShowPassword(true)
      setInputType("text")
    }
  }

  return (
    <div className="group relative">
      {label && (
        <label htmlFor={id} className="mb-1 mt-2 block">
          {label}
        </label>
      )}

      <input 
       id={id}
       type={inputType} 
       className={`w-full py-3 pr-3 pl-10 bg-dark-900 outline-none rounded-lg
        text-dark-300 placeholder:text-dark-500
        focus:border-primary-700 focus:border-[2px]
        ${error ? "border border-error-600" : "border-none"}`}
       ref={ref} 
       placeholder={placeholder}
       {...restProps}
       />
      {error && <span className="size-caption-sm text-error-600">{error.message}</span>}  
      {hint && !error && <span className="size-caption-sm text-dark-500">{hint}</span>}

      {
        type==="password" ? icons && (
          <span onClick={togglePassword}
          className="absolute left-2 top-3 w-6 h-6 cursor-pointer">
            {!showPassword ? icons[0] : icons[1]}
          </span>
        ):(
          icons && <span className="absolute left-2 top-4 w-6 h-6">{icons[0]}</span>
        )
      }

    </div>
  );
});

export default Input;