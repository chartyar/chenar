const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    madeTime:{
        type:Date,
        required:true
    },
    paid:{
        type:Boolean,
        required:true
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    previousPlan:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },
    // ISO8601 time type
    previousPlanStartDate:{
        type: String,
        default: null
    },
    discount:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },
    price: {
        type: Number,
        required: true
    }
})

const model = mongoose.models.Plan || mongoose.model("Plan",schema)
export default model;