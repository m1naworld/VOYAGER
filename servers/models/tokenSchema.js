const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    userid : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    token: {type :String}
},{versionKey : false});
export const Rtoken = mongoose.model("token",tokenSchema);