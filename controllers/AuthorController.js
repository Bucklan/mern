import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import AuthorModule from "../models/Author.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const requestPassword = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(requestPassword, salt);

        const doc = new AuthorModule({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            password: hash,
            year_of_birth: req.body.year_of_birth,
        });

        const author = await doc.save();

        const token = jwt.sign(
            {
                _id: author._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {password, ...authorData} = author._doc

        res.json({
            ...authorData,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "register to failed"
        });
    }
}

export const login = async (req, res) => {
    try {
        const author = await AuthorModule.findOne({email: req.body.email});

        if (!author) {
            return res.status(404).json({
                message: 'Authors not found'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, author._doc.password);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'incorrect email or password',
            });
        }

        const token = jwt.sign(
            {
                _id: author._id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {password, ...authorData} = author._doc

        res.json({
            ...authorData,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "login to failed"
        });
    }
}
export const getMe = async (req, res) => {
    try {
        const author = await AuthorModule.findById(req.authorId);


        if (!author) {
            return res.status(404).json({
                message: "authors not found"
            });
        }


        const {password, ...authorData} = author._doc

        res.json(authorData);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "register to failed"
        });
    }
}
