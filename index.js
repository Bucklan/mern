import express from 'express';
import mongoose from "mongoose";
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js';
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))
// auth
app.post('/login', loginValidation, UserController.login);
app.post('/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

//posts
app.get('/posts', checkAuth, PostController.index)
app.post('/posts', checkAuth,/* postCreateValidation,*/ PostController.create)
app.get('/posts/:id', checkAuth, PostController.show)
app.patch('/posts/:id', checkAuth, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.destroy);
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

