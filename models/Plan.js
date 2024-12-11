const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required: true
    },
    duration:{
        type:String,
        required:true
    },
    sessionNum:{
        type:Number,
        required:true
    },
    permissions:{
        type:[String],
        required:true
    },
    discount:{
        type:Number,
        required:false
    },
    roles:{
        type:[String],
        required:true
    },
    enabled:{
        type:Boolean,
        required:true
    }
})

const model = mongoose.models.Plan || mongoose.model("Plan",schema)
export default model;