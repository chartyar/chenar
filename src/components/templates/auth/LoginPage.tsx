"use client";
import Input from "@/components/modules/Input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountdownTimer from "@/components/modules/Countdown";
import OTPInput from "@/components/modules/OtpInput";

const mobileSchema = yup.object({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره موبایل نامعتبر می باشد"),
});

const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد") // حداقل 8 کاراکتر
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "رمز عبور باید شامل حروف و اعداد انگلیسی باشد"
    ) // شامل حروف و اعداد
    .required("رمز عبور الزامی است"), // الزامی بودن رمز عبور
});

type MobileInput = yup.InferType<typeof mobileSchema>;
type PasswordInput = yup.InferType<typeof passwordSchema>;

export default function Loginpage() {
  const [status, setStatus] = useState<string>("mobileForm");
  const {
    handleSubmit: handleUserMobileSubmit,
    control: mobileControl,
    formState: { errors: mobileErrors },
  } = useForm<MobileInput>({
    resolver: yupResolver(mobileSchema),
  });

  const {
    handleSubmit: handleUserPasswordSubmit,
    control: passwordControl,
    formState: { errors: passwordErrors },
  } = useForm<PasswordInput>({
    resolver: yupResolver(passwordSchema),
  });

  const userMobileSubmitHandler: SubmitHandler<MobileInput> = async (data) => {
    const { mobile } = data;
    setStatus("verifyMobile");
  };

  const userPasswordSubmitHandler: SubmitHandler<PasswordInput> = async (
    data
  ) => {
    const { password } = data;
    alert("logged in");
  };

  return (
    <>
      {status === "mobileForm" && (
        <div className="w-full m-auto p-6 flex flex-col justify-between gap-4 bg-dark-950 rounded-2xl max-w-[392px]">
          <h2 className="size-body-lg weight-bold text-dark-300">
            وارد کردن شماره تلفن
          </h2>
          <form
            className="flex flex-col justify-between gap-4"
            onSubmit={handleUserMobileSubmit(userMobileSubmitHandler)}
          >
            <Controller
              name="mobile"
              control={mobileControl}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="شماره تلفن خود را وارد کنید"
                  {...field}
                  error={mobileErrors.mobile}
                />
              )}
            />

            <button
              type="submit"
              className="w-full size-caption-lg bg-primary-700 text-dark-300 py-3 rounded-lg 
               weight-regular transition duration-300 hover:bg-primary-800"
            >
              مرحله بعدی
            </button>
          </form>
          <Link href={"/auth/register"} className="link text-center">
            حساب کاربری ندارید؟ثبت نام کنید!
          </Link>
        </div>
      )}

      {status === "verifyMobile" && (
        <div className="w-full m-auto p-6 flex flex-col justify-between gap-4 bg-dark-950 rounded-2xl max-w-[392px]">
          <h2 className="size-body-lg weight-bold text-dark-300">
            کد تایید جهت ادامه
          </h2>
          <div className="flex justify-between items-center weight-regular size-caption-sm">
            <span className="text-dark-300">
              به شماره <span className="text-primary-600">۰۹۱۰۰۳۳۲۲۰۲</span>
              فرستاده شد
            </span>
            <span className="text-dark-500">
              <span className="text-dark-300">
                <CountdownTimer initialSeconds={60} />
              </span>
              تا ارسال مجدد کد تایید
            </span>
          </div>
          <form className="flex flex-col justify-between gap-4">
            <OTPInput length={6} />
            <button
              onClick={() => setStatus("enterPassword")}
              className="w-full size-caption-lg bg-primary-700 text-dark-300 py-3 rounded-lg 
               weight-regular transition duration-300 hover:bg-primary-800"
            >
              مرحله بعدی
            </button>
          </form>
          <button
            onClick={() => setStatus("mobileForm")}
            className="link text-center"
          >
            شماره اشتباه است؟ ویرایش کنید!
          </button>
        </div>
      )}

      {status === "enterPassword" && (
        <div className="w-full m-auto p-6 flex flex-col justify-between gap-4 bg-dark-950 rounded-2xl max-w-[392px]">
          <h2 className="size-body-lg weight-bold text-dark-300">
            گزیدن رمز عبور
          </h2>
          <form
            className="flex flex-col justify-between gap-4"
            onSubmit={handleUserPasswordSubmit(userPasswordSubmitHandler)}
          >
            <Controller
              name="password"
              control={passwordControl}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="رمزعبور خود را وارد کنید"
                  {...field}
                  error={passwordErrors.password}
                />
              )}
            />

            <button
              type="submit"
              className="w-full size-caption-lg bg-primary-700 text-dark-300 py-3 rounded-lg 
               weight-regular transition duration-300 hover:bg-primary-800"
            >
              مرحله بعدی
            </button>
          </form>
          <button
            onClick={() => setStatus("mobileForm")}
            className="link text-center"
          >
            از قبل حساب دارید؟ وارد شوید!
          </button>
        </div>
      )}
    </>
  );
}
