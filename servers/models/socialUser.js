import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    provider: {type: String, required: true},
    snsId: {type: String, required: true},
    email : {type: String, unique: true, required: true},
    name : {type: String},
    gender : {type : String},
    age : {type: String},
    birth : {type : String},
    birthyear : {type: String},
    phone : {type: String},
    refresh : {type: String}
}, {versionKey: false});

export const socialUser = mongoose.model("User", userSchema);

// export default User;

