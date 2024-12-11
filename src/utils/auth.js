import {hash, compare} from "bcryptjs"
import {verify, sign} from "jsonwebtoken"


const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword;
}

const verifyPassword = async (password, hashedPassword) => {
    const isValid = await compare(password, hashedPassword)
    return isValid;
}

const generateAccessToken = async (data) => {
    const token = sign({...data}, process.env.generateAccessToken,{
        expiresIn: "3d"
    })
    return token;
}

const verifyAccessToken = async (token) => {
    try {
        const tokenPayload = verify(token, process.env.generateAccessToken)
        return tokenPayload;
    } catch (err) {
        console.log("verify token access error :", err)
    }
}


const validateEmail = (email) => {
    const pattern = /^((?=.{1,64}@.{1,255}$)([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})){5,25}$/g
    return pattern.test(email)
}

const validatePhone = (phone) => {
    const pattern = /^09[0-9]{9}$/g
    return pattern.test(phone)
}

const validatePassword = (password) => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/g
    return pattern.test(password)
}

const validateName = (name) => {
    const pattern = /^[\u0600-\u06FF]{3,}$/g
    return pattern.test(name)
}

const validateIdentificationCode = (code) => {
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