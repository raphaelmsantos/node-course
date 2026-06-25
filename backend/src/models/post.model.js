import mongoose, { Schema } from "mongoose";


const postSchema = new Schema(
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
        require: true,
        min: 1,
        max: 150
    }
},
{
    timestamps: true
});

export const Post = mongoose.model("Post", postSchema);
