const mongoose = require("mongoose")

const schema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
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
    identificationCode:{
        type: String,
        required: true
    },
    bonus:{
        type: Number,
        required: true,
        default:0
    },
    wallet:{
        type: Number,
        required: true,
        default:0
    },
    subUsers:{
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }]
    },
    inviter:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        default: null
    },
    role:{
        type: String,
        default:"USER"
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