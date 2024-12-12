import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BanModel from "@/models/Ban";
import {
  generateAccessToken,
  hashPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateIdentificationCode,
} from "@/utils/auth";

export async function POST(req:any) {
  await connectToDB();
  const body = await req.json();
  const { firstname, lastname, phone, identificationCode, email, password } =
    body;
  let inviter = null;

  // validation
  const isFirstnameValid = validateName(firstname);
  if (!isFirstnameValid) {
    return Response.json({}, { status: 422, statusText: "firstname" });
  }
  const isLastnameValid = validateName(lastname);
  if (!isLastnameValid) {
    return Response.json({}, { status: 422, statusText: "lastname" });
  }
  const isPhoneValid = validatePhone(phone);
  if (!isPhoneValid) {
    return Response.json({}, { status: 422, statusText: "phone" });
  }
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    return Response.json({}, { status: 422, statusText: "email" });
  }
  if (identificationCode) {
    const isIdentificationCodeValid =
      validateIdentificationCode(identificationCode);
    if (!isIdentificationCodeValid) {
      return Response.json(
        {},
        { status: 422, statusText: "identificationCode" }
      );
    }

    // is identificationCode exist or not
    inviter = await UserModel.findOne({
      identificationCode
    });
    if (!inviter) {
      return Response.json(
        {},
        { status: 422, statusText: "identificationCode" }
      );
    }
  }
  const isPasswordValid = validatePassword(password);
  if (!isPasswordValid) {
    return Response.json({}, { status: 422, statusText: "password" });
  }

  // is user banned or not
  const isUserBanned = await BanModel.findOne({
    $or: [{ phone }, { email }],
  });
  if (isUserBanned) {
    return Response.json(
      { message: "phone or email is banned" },
      { status: 401 }
    );
  }

  // is user exist or not
  const isUserExist = await UserModel.findOne({
    $or: [{ phone }, { email }],
  });
  if (isUserExist) {
    return Response.json(
      { message: "the email already exist" },
      { status: 409 }
    );
  }

  // create identificationCode for user
  const users = await UserModel.find({})
  const code = users.length + 10000

  // hash password and create access token
  const hashedPassword = await hashPassword(password);
  const accessToken = await generateAccessToken({ phone });

  

  const user = await UserModel.create({
    firstname,
    lastname,
    email,
    phone,
    inviter:inviter?._id,
    wallet:inviter?.bonus,
    identificationCode:code,
    password: hashedPassword,
    role: "USER",
  });

  if(inviter){
    await UserModel.findOneAndUpdate({_id:inviter._id},{
        $push:{
            subUsers:user._id
        }
    })
  }


  return Response.json(
    { message: "user signup successfully" },
    {
      status: 201,
      headers: {
        "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly; Secure; Max-Age=${
          7 * 24 * 60 * 60
        }`,
      },
    }
  );
}
