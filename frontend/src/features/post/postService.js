import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const POSTS_URL = `${API_URL}posts/`;

// Create new post
const createPost = async(postData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(POSTS_URL,postData,config)
    return response.data
}
// get all posts
const getAllPosts =async()=>{
    const response = await axios.get(API_URL)
    return response.data
}

// get all user posts
const getPosts =async(userId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(`${POSTS_URL}/user/${userId}`, config);
    return response.data;
}

// get post by id
const getPost = async(postId)=>{
    const response = await axios.get(POSTS_URL+postId)
    return response.data
}

// Update  post
const updatePost = async(postId,postData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(POSTS_URL+postId,postData,config)
    return response.data
}

// delete post by id
const deletePost = async(postId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(POSTS_URL + postId,config)
    return response.data
}
const searchPosts = async (term) => {
    const response = await axios.get(`${POSTS_URL}search?term=${term}`);
    return response.data;
};
const getRecentPosts = async (term) => {
    const response = await axios.get(`${POSTS_URL}recent`);
    return response.data;
};

const postService = {
    createPost,
    getPost,
    getPosts,
    getAllPosts,
    deletePost,
    updatePost,
    searchPosts,
    getRecentPosts
}
export default postService
