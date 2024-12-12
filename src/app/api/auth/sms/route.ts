import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp"; 
import UserModel from "@/models/User"; 

import { validatePhone } from "@/utils/auth";


export async function POST(req:any){
    await connectToDB();
    const body = await req.json()
    const {phone} = body

    const isPhoneValid = validatePhone(phone);
  if (!isPhoneValid) {
    return Response.json({}, { status: 422, statusText: "phone" });
  }

  // is phone exist or not
  const isPhoneExist = await UserModel.findOne({
    phone
  });
  if (isPhoneExist) {
    return Response.json(
      { message: "the phone already exist" },
      { status: 409 }
    );
  }

    const date = new Date();
    const expTime = date.getTime() + 120000;

    const code = Math.floor(Math.random() * 999999);

    const url = 'https://ippanel.com/api/select';

    const data = {
        op: 'pattern',
        user: 'u09100332202',
        pass: 'Faraz@1888204580444833',
        fromNum: '3000505',
        toNum: phone,
        patternCode: 'mylypv1y8g4p5mn',
        inputData: [
            {
                'verification-code': code,
            },
        ],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if(response.status===200){
            await OtpModel.create({
                phone,
                code,
                expTime
            })
            return Response.json({message:"sms send successfully"})
        }
    }catch (error:any) {
        return Response.json(
            { message: error.message },
            { status: 500 }
          );
    }

}
