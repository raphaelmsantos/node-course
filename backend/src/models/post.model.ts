import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
    name: string;
    description: string;
    age: number;
}

const postSchema = new Schema<IPost>(
{
    name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 300,
        },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 150
    }
},
{
    timestamps: true
});

export const Post = mongoose.model<IPost>("Post", postSchema);
