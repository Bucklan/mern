import {body} from 'express-validator';

const loginValidation = [
    body('email','Error format email').isEmail(),
    body('password', 'Password must min 8 size word').isLength({min: 8}),
];

export default loginValidation;