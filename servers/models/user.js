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
    // socialOnly : {type: Boolean}
}, {versionKey: false});

export const User = mongoose.model("User", userSchema);

// export default User;

