import axios from "axios";

const API_URL = 'http://localhost:5555/comments/'


// Create new Comment
const createComment = async(commentData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL,commentData,config)
    return response.data
}

// get all comments of a post
const getComments =async(postId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+postId,config)
    return response.data
}

// get comment by id
const getComment = async(commentId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+commentId,config)
    return response.data
}

// Update  Comment
const updateComment = async(commentId, commentData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL+commentId,commentData,config)
    return response.data
}

// delete update by id
const deleteComment = async(commentId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + commentId,config)
    return response.data
}

const likeComment = async (commentId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(`${API_URL}${commentId}/like`,config);
    return response.data;
  };

const commentService = {
    createComment,
    getComments,
    getComment,
    updateComment,
    deleteComment,
    likeComment,
}
export default commentService
