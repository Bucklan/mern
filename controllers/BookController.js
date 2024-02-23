const BookModule = require('../models/Book.js');

module.exports = async function index(req, res){
    try {
        const allBooks = await BookModule.find().populate('author').exec();
        res.render('index', {books: allBooks});
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка загрузки books');
    }
}
module.exports = async function create(req, res){
    try {
        const doc = new BookModule({
            title: req.body.title,
            text: req.body.text,
            page: req.body.page,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            author: req.authorId,
        });

        const book = await doc.save();

        res.status(200).json(book)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an book'
        })
    }
}
// export const show = async (req, res) => {
//     try {
//         const bookId = req.params.id;
//
//         BookModule.findOneAndUpdate({
//                 _id: bookId,
//             },
//             {
//                 $inc: {viewsCount: 1}
//             },
//             {
//                 returnDocument: 'after'
//             })
//             .populate('author').exec()
//             .then(doc => {
//                 if (!doc) {
//                     return res.status(404).json({
//                         message: "book not found2"
//                     });
//                 }
//
//                 return res.json(doc);
//             }).catch(e => {
//             if (e) {
//                 console.log(e);
//                 return res.status(500).json({
//                     message: 'failed to create an book1'
//                 });
//             }
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//             message: 'failed to create an book3'
//         })
//     }
// }
// export const update = async (req, res) => {
//     try {
//         const bookId = req.params.id;
//         await BookModule.updateOne(
//             {
//                 _id: bookId,
//             },
//             {
//                 title: req.body.title,
//                 text: req.body.text,
//                 page: req.body.page,
//                 imageUrl: req.body.imageUrl,
//                 tags: req.body.tags,
//             },
//         );
//         //
//         res.status(200).json(
//             {
//                 message: 'Book successfully updated!',
//             },
//         );
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//             message: 'failed to update on book'
//         })
//     }
// }
// export const destroy = async (req, res) => {
//     try {
//         const bookId = req.params.id;
//
//         BookModule.findOneAndDelete(
//             {
//                 _id: bookId,
//             }
//         )
//             .then(doc => {
//                     if (!doc) {
//                         return res.status(404).json({
//                             message: "book not found2"
//                         });
//                     }
//                     return res.status(200).json(
//                         {
//                             message: 'Book successfully deleted!',
//                         }
//                     )
//                 }
//             )
//             .catch(e => {
//                 if (e) {
//                     console.log(e);
//                     return res.status(500).json({
//                         message: 'failed to delete book'
//                     })
//                 }
//             });
//
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//             message: 'failed to create an book'
//         })
//     }
// }