import PostModule from "../models/Post.js";
export const getAll = async (req, res) => {
    try {
        const posts = await PostModule.find().populate('user').exec();

        res.json(posts);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an post'
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModule({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an post'
        })
    }
}