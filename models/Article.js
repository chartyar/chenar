const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    shortLink:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    seo:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

schema.virtual("comments",{
    ref:"Comment",
    localField:"_id",
    foreignField:"article"
})


const model = mongoose.models.Article || mongoose.model("Article",schema)
export default model;