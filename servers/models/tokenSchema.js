const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    snsId : {type: mongoose.SchemaTypes.String,  ref:'User'},
    token: {type :String}
},{versionKey : false});


export const refresh = mongoose.model("token",tokenSchema);
