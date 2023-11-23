import mongoose from "mongoose";

const postSchema =  mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        tags: { type: [String] },
        createdAt: { type: Date, default: Date.now },
        Image : { type: String },
        catagory : { type: String },
        status : { type: String,default: 'draft'},
        commentId : {type: String},
    },
    {
        timestamps: true,
    }
);

export const Blog =  mongoose.model('Blog', postSchema)