import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    year_of_birth: {
        type: Number,
        required: true,
    },

    avatarUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model('Author', AuthorSchema);