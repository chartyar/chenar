"use client";
import Input from "@/components/modules/Input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRef, useState } from "react";
import CountdownTimer from "@/components/modules/Countdown";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";

const mobileSchema = yup.object({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره موبایل نامعتبر می باشد"),
});

const nameSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "نام باید حداقل ۳ حرف باشد")
    .matches(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است")
    .required("نام الزامی است"),
  lastName: yup
    .string()
    .min(3, "نام خانوادگی باید حداقل ۳ حرف باشد")
    .matches(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است")
    .required("نام خانوادگی الزامی است"),
});

const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "رمز عبور باید شامل حروف و اعداد انگلیسی باشد"
    )
    .required("رمز عبور الزامی است"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "رمز عبور و تکرار آن باید یکسان باشد")
    .required("تایید رمز عبور الزامی است"),

  referralCode: yup
    .string()
    .optional()
    .test("is-5-digits", "کد معرف باید یک عدد ۵ رقمی باشد", (value) => {
      if (!value) return true;
      return /^\d{5}$/.test(value);
    }),

  terms: yup.boolean().required("پذیرش شرایط و قوانین الزامی است"),
});

type MobileInput = yup.InferType<typeof mobileSchema>;
type NameInput = yup.InferType<typeof nameSchema>;
type PasswordInput = yup.InferType<typeof passwordSchema>;

export default function RegisterPage() {
  const [status, setStatus] = useState<string>("mobileForm");
  const [verifyError, setVerifyError] = useState<boolean>(false);
  const [mobile, setMobile] = useState<string>("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const moveToNext = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const currentInput = inputsRef.current[index];
    const maxLength = parseInt(currentInput?.getAttribute("maxLength") || "1");
    const inputValue = currentInput?.value;

    if (event.key === "Backspace" && inputValue?.length === 0) {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (
      inputValue &&
      inputValue.length >= maxLength &&
      event.key !== "Backspace"
    ) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {
      event.target.value = value.replace(/\D/g, ""); // حذف کاراکترهای غیرعددی
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isAllFilled = inputsRef.current.every((input) => input?.value.trim() !== "");
    if (!isAllFilled) {
      setVerifyError(true);
    } else {
      setVerifyError(false);
      setStatus("setName")
    }
  };

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
    setMobile(mobile);
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
                  icons={[<LuPhone className="w-5 h-5 stroke-dark-400" />]}
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
              به شماره <span className="text-primary-600">{mobile + " "}</span>
              فرستاده شد
            </span>
            <CountdownTimer initialSeconds={120} />
          </div>
          <form className="flex flex-col justify-between gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-between" dir="ltr">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  className="w-12 h-12 text-dark-400 text-center rounded-lg outline-none bg-dark-900 size-body-xl weight-regular focus:border-[2px] focus:border-primary-600"
                  onKeyUp={(event) => moveToNext(index, event)}
                  onChange={handleInputChange}
                />
              ))}
            </div>
            {verifyError && <span className="size-caption-sm text-error-600">کد تایید را به درستی وارد کنید</span>}  
            <button type="submit"
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
                  icons={[
                    <AiOutlineEye className="w-6 h-6 fill-dark-400" />,
                    <AiOutlineEyeInvisible className="w-6 h-6 fill-dark-400" />,
                  ]}
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
                  icons={[
                    <AiOutlineEye className="w-6 h-6 fill-dark-400" />,
                    <AiOutlineEyeInvisible className="w-6 h-6 fill-dark-400" />,
                  ]}
                />
              )}
            />

            <Controller
              name="referralCode"
              control={passwordControl}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="کد معرف خود را وارد کنید"
                  {...field}
                  error={passwordErrors.referralCode}
                  hint="در صورتی که کد معرف دارید وارد کنید"
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
