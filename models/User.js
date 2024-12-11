const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    IdentificationCode:{
        type: String,
        required: true
    },
    bonus:{
        type: Number,
        required: true
    },
    wallet:{
        type: Number,
        required: true
    },
    subUsers:{
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }]
    },
    inviter:{
        type: mongoose.Types.ObjectId,
        default: null
    },
    roles:{
        type: [String],
        default:["USER"]
    },
    permissions:{
        type: [String]
    },
    plan:{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    planStart:{
        type:Date,
        default:null
    }
},{
    timestamp:true
})

const model = mongoose.models.User || mongoose.model('User',schema)

export default model;