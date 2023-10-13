import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import registerValidation from "./validations/auth.js";
import {validationResult} from "express-validator";
import UserModule from './models/User.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from "./controllers/UserController.js";

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))
app.post('/login', UserController.login);
app.post('/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});