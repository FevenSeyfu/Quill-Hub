import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const COMMENTS_URL = `${API_URL}comments/`;

// Create new Comment
const createComment = async(commentData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(COMMENTS_URL,commentData,config)
    return response.data
}

// get all comments of a post
const getComments =async(postId)=>{
    const response = await axios.get(COMMENTS_URL+postId)
    return response.data
}

// get comment by id
const getComment = async(commentId)=>{
    const response = await axios.get(COMMENTS_URL+commentId)
    return response.data
}

// Update  Comment
const updateComment = async(commentId, commentData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(`${COMMENTS_URL}/${commentId}/${commentData}`,config)
    return response.data
}

// delete update by id
const deleteComment = async(commentId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(COMMENTS_URL + commentId,config)
    return response.data
}

const likeComment = async (commentId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(`${COMMENTS_URL}${commentId}/like`,config);
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
