import { Post } from '../models/postsModel.js';

export const createPosts = async (request,response) => {
    try{
        if(
            !request.body.title || 
            !request.body.author || 
            !request.body.content ||
            !request.body.catagory ){
            return response.status(400).send({ message: 'Please fill all required fields'});
        }
        const newPost = {
            title:request.body.title,
            content:request.body.content,
            author:request.user.id,
            tags:request.body.tags,
            Image:request.body.Image,
            catagory:request.body.catagory,
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
        const posts = await Post.find({user: request.user.id});
        return response.status(200).json({
            count: posts.length,
            data:posts
        }
        );
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export const getPost = async (request,response)=>{
    try{
        const {id} = request.params;
        const post = await Post.findById(id);
        return response.status(200).json({
            data:post
        }
        );
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export const updatePost = async (request,response)=>{
    try{
        if(
            !request.body.title || 
            !request.body.author || 
            !request.body.content ||
            !request.body.catagory ){
            return response.status(400).send({ message: 'send all required fields: title,post,catagory'});
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