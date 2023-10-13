import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import registerValidation from "./validations/auth.js";
import {validationResult} from "express-validator";
import UserModule from './models/User.js';
import checkAuth from './utils/checkAuth.js';

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))
app.post('/login', async (req, res) => {
    try {
        const user = await UserModule.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: 'Users not found'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'incorrect email or password',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {password, ...userData} = user._doc

        res.json({
            ...userData,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "login to failed"
        });
    }
});
app.post('/register', registerValidation, async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const requestPassword = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(requestPassword, salt);

        const doc = new UserModule({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            password: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {password, ...userData} = user._doc

        res.json({
            ...userData,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "register to failed"
        });
    }

});
app.get('/auth/me', checkAuth, async (req, res) => {
    try {
        const user = await UserModule.findById(req.userId);


        if (!user) {
            return res.status(404).json({
                message: "users not found"
            });
        }


        const {password, ...userData} = user._doc

        res.json(userData);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "register to failed"
        });
    }
})
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});