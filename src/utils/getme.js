import {cookies} from "next/headers";
import UserModel from "@/models/User";
import { verifyAccessToken} from "@/utils/auth";
import connectToDB from "@/configs/db";


const authUser = async () => {
    await connectToDB()
    const token = cookies().get("token")
    let user = null
    if (token) {
        const tokenPayLoad = await verifyAccessToken(token.value)
        if (tokenPayLoad) {
            user = await UserModel.findOne({
                username:tokenPayLoad.username
            })
        }
    }
    return user;
}

const authAdmin = async () => {
    await connectToDB()
    const token = cookies().get("token")
    let user = null
    if (token) {
        const tokenPayLoad = await verifyAccessToken(token.value)
        if (tokenPayLoad) {
            user = await UserModel.findOne({
                username:tokenPayLoad.username
            })
            if (user.role === "ADMIN") {
                return user
            }
        }
    }
    return null
}


export {
    authUser,
    authAdmin
}
