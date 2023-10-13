import {body} from 'express-validator';

const postCreateValidation = [
    body('title','insert title post').isLength({min:3}).isString(),
    body('text', 'insert text post').isLength({min: 3}).isString,
    body('tags','Error format tags').optional().isString,
    body('imageUrl','Error url').optional().isString(),
];

export default postCreateValidation;