import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
    {
        post : {type: mongoose.Schema.ObjectId, ref: "Post"},
        userId : {type: mongoose.Schema.ObjectId, ref: "User"},
        content :  { type : Date, required: true},
    },
    {
        timestamps: true,
    }
)

export const Comment =  mongoose.model('Comment', commentSchema)