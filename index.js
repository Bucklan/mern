import express from 'express';
import multer from 'multer';
import mongoose from "mongoose";
import {registerValidation, loginValidation, bookCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js';
import * as AuthorController from "./controllers/AuthorController.js";
import * as BookController from "./controllers/BookController.js";
import BookModule from "./models/Book.js";

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
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/books')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

// --------------- ROUTES -----------------
// auth
app.post('/login', /*loginValidation,*/ AuthorController.login);
app.post('/register', registerValidation, AuthorController.register);
app.get('/auth/me', checkAuth, AuthorController.getMe)
//
app.get('/books', async function (req, res) {
    try {
        const books = await BookModule.find().populate('author').exec();
        res.json(books);
    } catch (e) {
        console.log(e);
    }
});
app.get('/books/:id', checkAuth, BookController.show)
app.post('/books', checkAuth,/* bookCreateValidation,*/ BookController.create)
app.patch('/books/:id', checkAuth, BookController.update)
app.delete('/books/:id', checkAuth, BookController.destroy);
// run server then  port create
app.listen(4444, (err) => {
    // listRoutes();
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});



