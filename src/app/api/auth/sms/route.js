const request = require('request');

export async function POST(req){
    const body = req.json()
    const {phone} = body
    const code = Math.floor(Math.random() * 99999)
    request.post({
        url: 'http://ippanel.com/api/select',
        body: {
            "op":"pattern",
            "user":"u09100332202",
            "pass":"Faraz@1888204580444833",
            "fromNum":"3000505",
            "toNum":phone,
            "patternCode":"mylypv1y8g4p5mn",
            "inputData":[
                {"verification-code":code}
            ]
        },
        json: true,
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
            console.log(response.body);
        } else {
            console.log("whatever you want");

        }
    });

}

export async function GET(){
    try{
        return Response.json({message:"hello"})

    }catch (err){
        return Response.json({message:err.message})
    }
}
