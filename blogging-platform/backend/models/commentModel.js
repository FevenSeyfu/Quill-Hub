import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
    {
        post : {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post"},
        userId : {type: mongoose.Schema.Types.ObjectId,required: true, ref: "User"},
        userName: { type: String, required: true},
        content :  { type : String, required: true},
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
)

export const Comment =  mongoose.model('Comment', commentSchema) 