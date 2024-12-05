import * as React from "react";
import { FieldError } from "react-hook-form";


interface InputProps {
  type: string;
  label?: string;
  id?: string;
  placeholder?:string;
  error?:FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, label, id,error, placeholder,...restProps} = props;

  return (
    <div className="group">
      {label && (
        <label htmlFor={id} className="mb-1 mt-2 block">
          {label}
        </label>
      )}

      <input 
       id={id}
       type={type} 
       className={`w-full p-3 bg-dark-900 outline-none rounded-lg
        text-dark-300 placeholder:text-dark-500
        focus:border-primary-700 focus:border-[2px]
        ${error ? "border border-error-600" : "border-none"}`}
       ref={ref} 
       placeholder={placeholder}
       {...restProps}
       />
      {error && <span className="size-caption-sm text-error-600">{error.message}</span>}
    </div>
  );
});

export default Input;