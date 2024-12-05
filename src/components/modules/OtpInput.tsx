import React, { useRef,useState } from "react";

interface OTPInputProps {
  length: number; // تعداد فیلدهای OTP
}

const OTPInput: React.FC<OTPInputProps> = ({ length }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill("")); // آرایه‌ای برای ذخیره مقادیر OTP
    const inputsRef = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null)); // ارجاع به تمام فیلدها
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
      const newOtp = [...otp];
  
      if (/^\d$/.test(value) || value === "") {
        newOtp[index] = value;
        setOtp(newOtp);
  
        if (value && index < length - 1) {
          const nextInput = inputsRef.current[index + 1];
          if (nextInput) nextInput.focus();
        }
      }
  
      if (!value && index > 0) {
        const prevInput = inputsRef.current[index - 1]; 
        if (prevInput) prevInput.focus();
      }
    };

  return (
    <div className="flex justify-between" dir="ltr">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)} // اختصاص ref به هر input
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          className="w-12 h-12 text-dark-400 text-center rounded-lg outline-none bg-dark-900 size-body-xl weight-regular focus:border-[2px] focus:border-primary-600"
        />
      ))}
    </div>
  );
};

export default OTPInput;
