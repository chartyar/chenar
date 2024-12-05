import React, { useState, useEffect } from "react";

// تعریف تایپ برای props
interface CountdownTimerProps {
  initialSeconds: number; // زمان شروع به ثانیه
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds }) => {
  // تعریف state برای شمارش معکوس
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return; // توقف تایمر وقتی زمان تمام شود

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // پاکسازی تایمر هنگام خروج
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${toPersianDigits(minutes.toString().padStart(2, "0"))}:${toPersianDigits(
      seconds.toString().padStart(2, "0")
    )}`;
  };

  const toPersianDigits = (input: string): string => {
    const persianDigits = [
      "۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"
    ];
    return input.split("").map((digit) => persianDigits[parseInt(digit, 10)]).join("");
  };

  return (
    <>
      {formatTime(seconds)}
    </>
  );
};

export default CountdownTimer;
