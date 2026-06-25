import { Request, Response } from "express";
import { Post } from "../models/post.model.js";

const createPost = async (req: Request, res: Response) => {
    try {
        const { name, description, age } = req.body;

        // validate required fields
        if (!name || !description || !age) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }


        const post = await Post.create({
            name,
            description,
            age
        });

        res.status(201).json({
            message: "Post registered successfully!",
            post: {
                id: post._id, 
                name: post.name, 
                description: post.description,
                age: post.age
            }
        })

    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error", 
            error: error.message
        })
    }
};

const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            posts
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const { id, name, description, age } = req.body;

        // validate required fields
        if (!name || !description || !age) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        
        const post = await Post
            .findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!post) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post update successfully!",
            post: {
                id: post._id, 
                name: post.name, 
                description: post.description,
                age: post.age
            }
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error", 
            error: error.message
        })
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            post
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post deleted successfully!"
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

export {
    createPost,
    getPosts,
    updatePost,
    getPostById,
    deletePost
}
