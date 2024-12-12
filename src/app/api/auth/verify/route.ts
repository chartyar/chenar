import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp"; 

export async function POST(req:any){
    await connectToDB();
    const body = await req.json();
    const {phone,code} = body;


    const otp = await OtpModel.findOne({ phone, code });
  
    if (otp) {
      const date = new Date();
      const now = date.getTime();
      
      if (otp.expTime < now) {
        return Response.json({message:"code is expired"},{status:410})
      }

      return Response.json({message:"code is correct"},{status:200})
 
    } else {
        return Response.json({message:"code is not correct"},{status:409})
    }
}