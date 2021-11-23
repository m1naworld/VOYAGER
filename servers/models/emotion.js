import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema({
    행복: [{type:Object}],
    화남: [{type:Object}],
    슬픔: [{type:Object}],
    두려움: [{type:Object}],
    
}, {versionKey:false});

export const emotion = mongoose.model("emotion", emotionSchema);



