const mongoose = require("mongoose");
require("./Product")

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        required: true,
    },
    article: {
        type: mongoose.Types.ObjectId,
        required:true,
        ref: "Article"
    },
    body: {
        type: String,
        required: true
    },
    parentComment: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    commentedAt: {
        type: Date,
        default: () => Date.now()
    },
    accepted:{
        type:Boolean,
        default:false
    },
    replies: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Comment"
        }]
    }
});

const model = mongoose.models.Comment || mongoose.model("Comment", schema)
export default model;