const mongoose = require("mongoose");
require("./User")

const schema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Types.ObjectId,
            required:true,
            ref: "User"
        },
        plan:{
            type: mongoose.Types.ObjectId,
            required:true,
            ref: "Plan"
        },
        transaction:{
            type: mongoose.Types.ObjectId,
            required:true,
            ref: "Transaction"
        }
    },
    {
        timestamps: true,
    }
);

const model = mongoose.models.Discount || mongoose.model("Discount", schema);

export default model;
