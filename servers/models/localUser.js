const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    snsId : {type: String},
    password : {type: String},
    name : {type: String},
    birth : {type: String},
    refresh : {type : String}
},{versionKey : false});


export const localUser = mongoose.model("apple",userSchema);