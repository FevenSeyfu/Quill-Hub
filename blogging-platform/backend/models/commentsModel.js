import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
    {
        post : {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post"},
        userId : {type: mongoose.Schema.Types.ObjectId,required: true, ref: "User"},
        content :  { type : String, required: true},
    },
    {
        timestamps: true,
    }
)

export const Comment =  mongoose.model('Comment', commentSchema)