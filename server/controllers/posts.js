import Mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Update Found");
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post Found");
    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: 'Post deleted Sucessfully' });
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post Found");
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatePost);
}