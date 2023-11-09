import {body} from 'express-validator';
let now_year = new Date();
export const registerValidation = [
    body('fullName', 'FullName must min 3 size word').isLength({min: 3}),
    body('email', 'Error format email').isEmail(),
    body('password', 'Password must min 8 size word').isLength({min: 8}),
    body('year_of_birth', 'birthday year must more 1950 and little now year').isInt({min:1950,max: now_year.getFullYear()}),
    body('avatarUrl', 'Error url').optional().isURL(),
];
export const loginValidation = [
    body('email', 'Error format email').isEmail(),
    body('password', 'Password must min 8 size word').isLength({min: 8}),
];

export const bookCreateValidation = [
    body('title', 'insert title book').isLength({min: 3}).isString(),
    body('text', 'insert text book').isLength({min: 3}).isString,
    body('page', 'insert page book').isLength({min: 1}).isNumeric,
    body('tags', 'Error format tags').optional().isArray,
    body('imageUrl', 'Error url').optional().isString(),
];

