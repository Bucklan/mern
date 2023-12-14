import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModule from "../models/User.js";
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

        const doc = new UserModule({
            email: req.body.email,
            fullName: req.body.fullName,
            birthdate: req.body.birthdate,
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
}

export const login = async (req, res) => {
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
}
export const getMe = async (req, res) => {
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
}

// export const sendEmail = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const user = await User.findOne({email: {$regex: email, $options: "i"}});
//
//         if (!user) {
//             return res.status(404).json({
//                 message: "users not found"
//             });
//         }
//
//         const payload = {
//             email: user.email,
//             userId: user._id,
//         };
//
//         const expiryTime = 60 * 60 * 1000;
//         const token = jwt.sign(payload, process.env.JWT_SECRET, {
//             expiresIn: expiryTime,
//         });
//
//         const newToken = new UserToken({
//             userId: user._id,
//             token: token,
//         });
//     }
// }
