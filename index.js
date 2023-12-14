import express from 'express';
import multer from 'multer';
import mongoose from "mongoose";
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js';
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import cors from "cors";

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// const storage = multer.diskStorage({
//     destination: (_, __, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (_, file, cb) => {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({storage})
app.use(express.json());
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))


// auth
app.post('/api/auth/login', loginValidation, UserController.login);
app.post('/api/auth/register', registerValidation, UserController.register);
app.get('/api/auth/me', checkAuth, UserController.getMe);
// app.post('/api/auth/logout', checkAuth, UserController.logout);
//  app.post('/api/auth/send-email', UserController.refresh);



// app.post('api/upload', checkAuth, upload.single('image'), (res, req) => {
//     res.json({
//         url: `/uploads${req.file.originalname}`,
//     })
// });

//posts
app.get('api/posts', checkAuth, PostController.index)
app.post('api/posts', checkAuth,/* postCreateValidation,*/ PostController.create)
app.get('api/posts/:id', checkAuth, PostController.show)
app.patch('api/posts/:id', checkAuth, PostController.update)
app.delete('api/posts/:id', checkAuth, PostController.destroy);
// run server then  port create
app.listen(4444, (err) => {
    listRoutes();
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});

// check list routes
const listRoutes = () => {
    const routes = app._router.stack
        .filter(r => r.route)
        .map(r => ({
            method: Object.keys(r.route.methods)[0].toUpperCase(),
            path: r.route.path
        }));
    console.log("Список маршрутов:");
    console.table(routes);
};

