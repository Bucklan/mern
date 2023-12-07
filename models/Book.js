const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    page: {
        type: Number,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: false,
    },
    imageUrl: String,
}, {
    timestamps: true,
});
const BookModule = mongoose.model('Book', BookSchema);
module.exports = BookModule;