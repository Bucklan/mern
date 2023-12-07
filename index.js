const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bookModule = require('./models/Book.js');
const AuthorModule = require('./models/Author.js');
const BookController = require('./controllers/BookController.js');
const BookModule = require("./models/Book");
// const AuthorController = require('./controllers/AuthorController.js');

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/books')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

// Book/index
app.get('/', async (req,res) => {
    try {
        const allBooks = await BookModule.find().populate('author').exec();
        res.render('books/index', {books: allBooks});
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка загрузки books');
    }
});
// Book/create

app.get('/books/create', (req, res) => {
    res.render('books/create')
})
app.post('/books/store',async (req,res)=>{
    try {
        const doc = new BookModule({
            title: req.body.title,
            text: req.body.text,
            page: req.body.page,
            imageUrl: req.body.imageUrl,
            // tags: req.body.tags,
            // author: req.authorId,
        });
        await doc.save();
        console.log('Book successfully created');
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an book'
        })
    }
})
// app.get('/create/author', (req, res) => {
//     res.render('author_create')
// })
// app.post('/save/book', async (req, res) => {
//     const name = req.body.name;
//     const surname = req.body.surname;
//     const gpa = req.body.gpa
//     const testData = {name, surname, gpa}
//
//     try {
//         const newUser = new Student(testData);
//         await newUser.save();
//         console.log('Book успешно добавлен');
//         res.redirect('/');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Ошибка сохранения Book');
//     }
//
// });
//
// app.get('/update-book/:id', async (req, res) => {
//
//     try {
//         let studentId = req.params.id;
//         const student = await Book.findById(studentId);
//         if (!student) {
//             return res.status(404).send('Book не найден');
//         }
//         res.render('book_edit',{ student: student })
//
//
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('not found  book');
//     }
// });
//
// app.post('/update-book/:id', async (req, res) => {
//     const bookId = req.params.id;
//     const updatedData = req.body;
//     try {
//         // Используем метод findByIdAndUpdate для обновления данных студента
//         const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
//
//         if (!updatedBook) {
//             return res.status(404).send('book не найден');
//         }
//         res.redirect('/update-book/'+bookId);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Ошибка при обновлении студента');
//     }
// });


app.listen(4444, (err) => {
    // listRoutes();
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});