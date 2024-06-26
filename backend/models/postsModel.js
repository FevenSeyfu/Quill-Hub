import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId,required:true ,ref: "User" },
    authorName : {type: String},
    tags: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    Image: { 
      public_id:{
        type:String,
        required: true
      },
      url:{
        type:String,
        required: true
      }
     },
    category: { type: String },
    status: { type: String, default: "draft" },
    votesCount: { type: Number, default: 0 },
    comments: { type: mongoose.Schema.ObjectId, ref: "Comment" },
    commentCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
