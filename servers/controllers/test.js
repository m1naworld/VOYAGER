import {Test} from "../models/test";
const express = require("express")
const mongoose = require("mongoose")

export const add_t = async(req,res) => {
    // let {행복, 분노, 슬픔, 두려움} = req.body
    // let {행복, 분노, 슬픔, 두려움} = req.body
    console.log(req.body)
    console.log(req.body.a)
    try {
        await Test.create( 
            {question: [{emotion: "행복", data: req.body.a},
            {emotion: "분노", data: req.body.b},
            {emotion: "슬픔", data: req.body.c},
            {emotion: "두려움", data: req.body.d},
            ]})
            // ([{emotion: "행복", data: req.body.a},
            // {emotion: "분노", data: req.body.b},
            // {emotion: "슬픔", data: req.body.c},
            // {emotion: "두려움", data: req.body.d},
            // ])
        res.status(200).send("ok")
    }
    catch (error){
        res.send(error)
        
    }
}




export const sends = async(req, res) => {
    try{
        const test = await Test.find({attributes: "question"}) 
        res.json(test[0].question);
    }catch(error){
        res.send(error)
    }
    
} 

