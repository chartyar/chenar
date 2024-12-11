import React, { useState, useEffect } from "react";

// تعریف تایپ برای props
interface CountdownTimerProps {
  initialSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${toPersianDigits(
      minutes.toString().padStart(2, "0")
    )}:${toPersianDigits(seconds.toString().padStart(2, "0"))}`;
  };

  const toPersianDigits = (input: string): string => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return input
      .split("")
      .map((digit) => persianDigits[parseInt(digit, 10)])
      .join("");
  };

  const sendVerifyCode = ()=>{
    alert("odfgm,.")
  }

  return (
    <span>
      <span className="text-dark-300">{formatTime(seconds)} </span>
      <span onClick={()=>{
        if(seconds<=0) sendVerifyCode()
      }}
      className={`text-dark-500 ${seconds<=0 && "cursor-pointer"}`}
      >تا ارسال مجدد کد تایید</span>
    </span>
  );
};

export default CountdownTimer;
