import { Post } from '../models/postsModel.js';
import { User } from '../models/userModel.js';

export const createPosts = async (request,response) => {
    const {title,content,category,tags,Image,} = request.body;
    try{
        if(
            !title ||!content || !category ){
            return response.status(400).send({ message: 'Please fill all required fields'});
        }
        const newPost = {
            title,
            content,
            author:request.user.id,
            tags,
            Image,
            category,
            status: 'posted',
        }
        const post = await Post.create(newPost);
        return response.status(201).send(post);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
}

export const getPosts = async (request,response)=>{
    try{
        const userId = request.user.id;
        const posts = await Post.find({ author: userId });
        
        return response.status(200).send(posts);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export const getPost = async (request,response)=>{
    try{
        const {id} = request.params;
        const post = await Post.findById(id);
        return response.status(200).send(post);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export const updatePost = async (request,response)=>{
    try{
        if(
            !request.body.title ||  
            !request.body.content ||
            !request.body.category ){
            return response.status(400).send({ message: 'send all required fields: title,post,category'});
        }
        const {id} = request.params;
        const result = await Post.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message: 'Post not found'})
        }
        return response.status(200).send({message: 'Post Updated successfuly'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export const deletePost = async (request,response)=>{
    try{
        const {id} = request.params;
        const post = await Post.findById(id);
        const user = await User.findById(request.user.id)

        if(!user){
            response.status(401).send({message: 'user not found'})
        } 
        if(post.author.toString() !== user.id){
            response.status(401).send({message: 'User not Authorized'})
        }
        const result = await Post.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: 'Post not found'})
        }
        return response.status(200).send({message: 'Post Deleted successfuly'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}