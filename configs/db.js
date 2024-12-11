const mongoose = require("mongoose");

const connectToDB = async () => {
    try{
        if (mongoose.connections[0].readyState){
            return true;
        }else{
             await mongoose.connect("mongodb://0.0.0.0:27017/chenar",{
                authSource:"admin"
            })
            console.log("connect to db successfully :))")
        }
    }catch (err){
        console.log("db connection error is => ", err)
    }
}

export default connectToDB;