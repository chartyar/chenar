"use client";
import Input from "@/components/modules/Input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";

const loginSchema = yup.object({
  mobile: yup
    .string()
    .required("شماره موبایل یا ایمیل الزامی است")
    .matches(/^((09[0-9]{9})|((?=.{1,64}@.{1,255}$)([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})))$/, "شماره موبایل یا ایمیل نامعتبر می باشد"),
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل۸ کاراکتر باشد")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "رمز عبور باید شامل حروف و اعداد انگلیسی باشد"
    )
    .required("رمز عبور الزامی است"),
});

type LoginInput = yup.InferType<typeof loginSchema>;

export default function Loginpage() {
  const {
    handleSubmit: handleUserSubmit,
    control: loginControl,
    formState: { errors: loginErrors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });

  const userSubmitHandler: SubmitHandler<LoginInput> = async (data) => {
    const { mobile, password } = data;
  };

  return (
    <>
      <div className="w-full m-auto p-6 flex flex-col justify-between gap-4 bg-dark-950 rounded-2xl max-w-[392px]">
        <h2 className="size-body-lg weight-bold text-dark-300">
          ورود به حساب کاربری
        </h2>
        <form
          className="flex flex-col justify-between gap-4"
          onSubmit={handleUserSubmit(userSubmitHandler)}
        >
          <Controller
            name="mobile"
            control={loginControl}
            defaultValue=""
            render={({ field }) => (
              <Input
                type="text"
                placeholder="شماره تلفن یا ایمیل خود را وارد کنید"
                {...field}
                error={loginErrors.mobile}
                icons={[<LuPhone className="w-5 h-5 stroke-dark-400" />]}
              />
            )}
          />

          <Controller
            name="password"
            control={loginControl}
            defaultValue=""
            render={({ field }) => (
              <Input
                type="password"
                placeholder="رمزعبور خود را وارد کنید"
                {...field}
                error={loginErrors.password}
                icons={[
                  <AiOutlineEye className="w-6 h-6 fill-dark-400" />,
                  <AiOutlineEyeInvisible className="w-6 h-6 fill-dark-400" />,
                ]}
              />
            )}
          />

          <button
            type="submit"
            className="w-full size-caption-lg bg-primary-700 text-dark-300 py-3 rounded-lg 
               weight-regular transition duration-300 hover:bg-primary-800"
          >
            ورود
          </button>
        </form>
        <Link href={"/auth/register"} className="link text-center">
          حساب کاربری ندارید؟ثبت نام کنید!
        </Link>
      </div>
    </>
  );
}
