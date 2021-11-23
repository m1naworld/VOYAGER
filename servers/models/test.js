import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
    {
    question : [{type:Object}] }, {versionKey: false})
    // {
    //     {emotion: {type:String}, data: [{type:Object}]}],
    // [{emotion: {type:String}, data: [{type:Object}]}],
    // {emotion: {type:String}, data: [{type:Object}]},
    // {emotion: {type:String}, data: [{type:Object}]}
    // ]}, {versionKey:false});
    // {
    //     행복: [{type:Object}],
    //     화남: [{type:Object}],
    //     슬픔: [{type:Object}],
    //     두려움: [{type:Object}],
        
    // },
export const Test = mongoose.model("test", testSchema);