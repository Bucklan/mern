import express from 'express';
import multer from 'multer';
import mongoose from "mongoose";
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js';
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

const app = express();

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
// connect to db
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

// --------------- ROUTES -----------------
// auth
app.post('/login', loginValidation, UserController.login);
app.post('/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

// app.post('/upload', checkAuth, upload.single('image'), (res, req) => {
//     res.json({
//         url: `/uploads${req.file.originalname}`,
//     })
// });

//posts
app.get('/posts', checkAuth, PostController.index)
app.post('/posts', checkAuth,/* postCreateValidation,*/ PostController.create)
app.get('/posts/:id', checkAuth, PostController.show)
app.patch('/posts/:id', checkAuth, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.destroy);
// run server then  port create
app.listen(4444, (err) => {
    // listRoutes();
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});

// check list routes
// const listRoutes = () => {
//     const routes = app._router.stack
//         .filter(r => r.route)
//         .map(r => ({
//             method: Object.keys(r.route.methods)[0].toUpperCase(),
//             path: r.route.path
//         }));
//     console.log("List Routes:");
//     console.table(routes);
// };

