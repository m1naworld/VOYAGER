const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email : {type: String},
    password : {type: String},
    name : {type: String},
    birth : {type: String},
    socialOnly : {type: String, default:false},
    token : {type : String}
},{versionKey : false});


export const localUser = mongoose.model("apple",userSchema);