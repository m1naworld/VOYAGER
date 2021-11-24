import { emotion } from "../models/emotion";
const express = require("express")
const mongoose = require("mongoose")

console.log(emotion)
export const add_q = async(req,res) => {
    let {행복, 분노, 슬픔, 두려움} = req.body
    console.log(req.body)
    try {
await emotion.create({
            행복, 분노, 슬픔, 두려움
        })
        res.status(200).send("ok")
    }
    catch (error){
        res.send(error)
        
    }
}