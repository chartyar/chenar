const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:true
    }
})

const model = mongoose.models.Contact || mongoose.model("Contact",schema)
export default model;