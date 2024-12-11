const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    permissions:{
        type:[String],
        required:true,
        default:[]
    }
})

const model = mongoose.models.Plan || mongoose.model("Plan",schema)
export default model;