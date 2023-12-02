import axios from "axios";

const API_URL = 'http://localhost:5555/posts/'


// Create new post
const createPost = async(postData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL,postData,config)
    return response.data
}

// Update  post
// const updatePost = async(postData,postId,token) =>{
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }
//     const response = await axios.put(API_URL+postId,postData,config)
//     return response.data
// }
// get all user posts
const getPosts =async(token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL,config)
    return response.data
}

// get post by id
const getPost = async(postId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+postId,config)
    return response.data
}
// delete post by id
const deletePost = async(postId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + postId,config)
    return response.data
}

const postService = {
    createPost,
    getPost,
    getPosts,
    deletePost,
    // updatePost
}
export default postService
