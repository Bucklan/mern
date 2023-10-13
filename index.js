import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import registerValidation from "./validations/auth.js";
import {validationResult} from "express-validator";

import UserModule from './models/User.js';

const app = express();

app.use(express.json());
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

app.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const requestPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(requestPassword, salt);

    const doc = new UserModule({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        password: passwordHash,
    });

    const user = await doc.save();


    res.json(user);
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});