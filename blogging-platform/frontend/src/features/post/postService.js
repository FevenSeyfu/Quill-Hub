import axios from "axios";

const API_URL = 'http://localhost:5555/posts/'


// Create new post
const createPost = async(postData,token) =>{
    const config = {
        headers: {
            Authorizstion: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,postData,config)
    return response.data
}

const postService = {
    createPost,
}

export default postService
