const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    provider: {type: String},
    snsId: {type: String},
    email : {type: String},
    password : {type: String},
    name : {type: String},
    birth : {type: String},
    birthyear: {type: String},
    phone: {type: String}
},{versionKey : false});


export const localUser = mongoose.model("apple",userSchema);