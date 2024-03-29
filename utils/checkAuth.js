import jwt from 'jsonwebtoken';
import {request} from "express";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');

            req.authorId = decoded._id;

            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({
                message: "no access"
            })
        }
    } else {
        return res.status(403).json({
            message: "no access"
        })
    }
}