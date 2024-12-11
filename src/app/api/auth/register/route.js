import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BanModel from "@/models/Ban";
import {
    generateAccessToken,
    hashPassword,
    validateEmail,
    validateName,
    validatePassword,
    validatePhone
} from "@/utils/auth";

export async function POST(req){
    await connectToDB()
    const body = await req.json()
    const {username,phone,email,password} = body

    // validation
    const isNameValidate = validateName(username)
    if (!isNameValidate){
        return Response.json({},{status:422,statusText:"name"})
    }
    const isPhoneValidate = validatePhone(phone)
    if (!isPhoneValidate){
        return Response.json({},{status:422,statusText:"phone"})
    }
    const isEmailValidate = validateEmail(email)
    if (!isEmailValidate){
        return Response.json({},{status:422,statusText:"email"})
    }
    const isPasswordValidate = validatePassword(password)
    if (!isPasswordValidate){
        return Response.json({},{status:422,statusText:"password"})
    }

    // is user banned
    const isUserBanned = await BanModel.findOne({
        $or:[{phone},{email}]
    })
    if (isUserBanned){
        return Response.json(
            {message:"phone or email is banned"},
            {status :401 }
        )
    }


    // is user exist or not
    const isUserExist = await UserModel.findOne({
        $or: [{phone},{email},{username}]
    })
    if (isUserExist){
        return Response.json(
        {message:"the phoneNumber or username or email already exist"},
        {status :409 }
        )
    }

    const hashedPassword = await hashPassword(password)
    const accessToken = await generateAccessToken({username})

    await UserModel.create({
        username,
        email,
        phone,
        password: hashedPassword,
        role:"USER"
    })

    // const headers = new Headers()
    // headers.append("Set-Cookie",`token=${accessToken};path=/;httpOnly=true;`)

    return Response.json({message:"user signup successfully"},
        {status : 201 , headers:{"Set-Cookie":`token=${accessToken};path=/;httpOnly=true;secure=true`}}
    )
}