import {generateAccessToken, validateName, validatePassword, verifyPassword} from "@/utils/auth";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User"

export async function POST(req) {
    await connectToDB()
    const body = await req.json()
    const {username, password} = body

    // validation
    const isNameValidate = await validateName(username)
    if (!isNameValidate) {
        return Response.json({}, {status: 422, statusText: "name"})
    }
    const isPasswordValidate = await validatePassword(password)
    if (!isPasswordValidate) {
        return Response.json({}, {status: 422, statusText: "password"})
    }

    // find user
    const user = await UserModel.findOne({username})
    if (!user) {
        return Response.json({message: "user not found"}, {status: 404})
    }

    // check password
    const isCorrectPassword = await verifyPassword(password, user.password)
    if (!isCorrectPassword) {
        return Response.json({message: "email or password is not correct"}, {status: 401})
    }

    // generate access token
    const accessToken = await generateAccessToken({username})

    return Response.json({message: "user logged in"},
        {status: 200, headers: {"Set-Cookie": `token=${accessToken};path=/;httpOnly=true;secure=true;`}})

}