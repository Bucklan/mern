import {body} from 'express-validator';

const registerValidation = [
    body('email','Error format email').isEmail(),
    body('password', 'Password must min 8 size word').isLength({min: 8}),
    body('fullName','FullName must min 3 size word').isLength({min: 3}),
    body('avatarUrl','Error url').optional().isURL(),
];

export default registerValidation;