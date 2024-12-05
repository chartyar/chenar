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

const nameSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "نام باید حداقل 3 حرف باشد") // حداقل 3 حرف برای نام
    .matches(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است") // فقط حروف فارسی و فاصله مجاز است
    .required("نام الزامی است"),
  lastName: yup
    .string()
    .min(3, "نام خانوادگی باید حداقل 3 حرف باشد") // حداقل 3 حرف برای نام خانوادگی
    .matches(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است") // فقط حروف فارسی و فاصله مجاز است
    .required("نام خانوادگی الزامی است"),
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

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "رمز عبور و تایید آن باید یکسان باشد") // تایید رمز عبور
    .required("تایید رمز عبور الزامی است"), // الزامی بودن تایید رمز عبور

  terms: yup
    .boolean()
    .required("پذیرش شرایط و قوانین الزامی است"), // الزامی بودن پذیرش شرایط و قوانین
});

type MobileInput = yup.InferType<typeof mobileSchema>;
type NameInput = yup.InferType<typeof nameSchema>;
type PasswordInput = yup.InferType<typeof passwordSchema>;

export default function RegisterPage() {
  const [status, setStatus] = useState<string>("mobileForm");


  const {
    handleSubmit: handleUserMobileSubmit,
    control: mobileControl,
    formState: { errors: mobileErrors },
  } = useForm<MobileInput>({
    resolver: yupResolver(mobileSchema),
  });

  const {
    handleSubmit: handleUserNameSubmit,
    control: nameControl,
    formState: { errors: nameErrors },
  } = useForm<NameInput>({
    resolver: yupResolver(nameSchema),
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

  const userNameSubmitHandler: SubmitHandler<NameInput> = async (data) => {
    const { firstName, lastName } = data;
    setStatus("setPassword");
  };

  const userPasswordSubmitHandler: SubmitHandler<PasswordInput> = async (
    data
  ) => {
    const { password, confirmPassword, terms } = data;
    setStatus("setPassword");
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
          <Link href={"/auth/login"} className="link text-center">
            از قبل حساب دارید؟ وارد شوید!
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
              به شماره <span className="text-primary-600">۰۹۱۰۰۳۳۲۲۰۲</span>{" "}
              فرستاده شد
            </span>
            <span className="text-dark-500">
              <span className="text-dark-300">
                <CountdownTimer initialSeconds={60} />
              </span>{" "}
              تا ارسال مجدد کد تایید
            </span>
          </div>
          <form className="flex flex-col justify-between gap-4">
            <OTPInput length={6} />
            <button
              onClick={() => setStatus("setName")}
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

      {status === "setName" && (
        <div className="w-full m-auto p-6 flex flex-col justify-between gap-4 bg-dark-950 rounded-2xl max-w-[392px]">
          <h2 className="size-body-lg weight-bold text-dark-300">
            نام و نام خانوادگی
          </h2>
          <form
            className="flex flex-col justify-between gap-4"
            onSubmit={handleUserNameSubmit(userNameSubmitHandler)}
          >
            <Controller
              name="firstName"
              control={nameControl}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="نام خود را وارد کنید"
                  {...field}
                  error={nameErrors.firstName}
                />
              )}
            />

            <Controller
              name="lastName"
              control={nameControl}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  {...field}
                  error={nameErrors.lastName}
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
            شماره تلفن اشتباه بود؟ از اینجا عوض کنید!
          </button>
        </div>
      )}

      {status === "setPassword" && (
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

            <Controller
              name="confirmPassword"
              control={passwordControl}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="تکرار رمزعبور خود را وارد کنید"
                  {...field}
                  error={passwordErrors.confirmPassword}
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