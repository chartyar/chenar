import connectToDB from "@/configs/db";
import {cookies} from "next/headers";
import {verifyAccessToken} from "@/utils/auth";
import UserModel from "@/models/User";

export async function GET(){
    await connectToDB()
    const token = await cookies().get("token")
    let user = null
    if (token) {
        const tokenPayLoad = await verifyAccessToken(token.value)
        if (tokenPayLoad) {
            user = await UserModel.findOne({
                username: tokenPayLoad.username
            })
        }
        return Response.json(user)
    }else {
        return Response.json({data:null},{status:401})
    }
}