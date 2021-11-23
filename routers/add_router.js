import express, { Router } from "express";
const route = express.Router()
import {emotion} from "../servers/models/emotion"
import {add_q} from '../servers/controllers/question'
import {add_t, sends} from '../servers/controllers/test'
import { Collection } from "mongoose";

route.route('/question').get((req, res) => res.send("ok")).post(add_q);
route.route('/test').get((req, res) => res.send("ok")).post(add_t);

export default route;


route.get('/send', sends).post('/send', (req, res) => {
    console.log(req.body)
});

