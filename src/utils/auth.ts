import {hash, compare} from "bcryptjs"
import {verify, sign} from "jsonwebtoken"


const hashPassword = async (password:string) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword;
}

const verifyPassword = async (password:string, hashedPassword:string) => {
    const isValid = await compare(password, hashedPassword)
    return isValid;
}

const generateAccessToken = async (data:any) => {
    const token = sign({...data}, "thsrh5465drtk5ilyul4k3kfy43ra3",{
        expiresIn: "7d"
    })
    return token;
}

const verifyAccessToken = async (token:string) => {
    try {
        const tokenPayload = verify(token, "thsrh5465drtk5ilyul4k3kfy43ra3")
        return tokenPayload;
    } catch (err) {
        console.log("verify token access error :", err)
    }
}


const validateEmail = (email:string):boolean => {
    const pattern = /^(?=.{5,30}$)((?=.{1,64}@.{1,255}$)([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/g
    return pattern.test(email)
}

const validatePhone = (phone:string):boolean => {
    const pattern = /^09[0-9]{9}$/g
    return pattern.test(phone)
}

const validatePassword = (password:string):boolean => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/g
    return pattern.test(password)
}

const validateName = (name:string):boolean => {
    const pattern = /^[\u0600-\u06FF]{3,}$/g
    return pattern.test(name)
}

const validateIdentificationCode = (code:string):boolean => {
    const pattern = /^\d{5}$/g
    return pattern.test(code)
}



export {
    hashPassword,
    verifyPassword,
    verifyAccessToken,
    generateAccessToken,
    validateEmail,
    validatePhone,
    validatePassword,
    validateName,
    validateIdentificationCode
}