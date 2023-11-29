import mongoose from "mongoose";

const postSchema =  mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: mongoose.Schema.ObjectId, ref: "User" },
        tags: { type: [String] },
        createdAt: { type: Date, default: Date.now },
        Image : { type: String },
        catagory : { type: String },
        status : { type: String,default: 'draft'},
        votesCount : { type:Number,default: 0},
        comments: { type: mongoose.Schema.ObjectId, ref: "Comment"},
        commentCount : { type:Number,default: 0}
    },
    {
        timestamps: true,
    }
);

export const Post =  mongoose.model('Post', postSchema)