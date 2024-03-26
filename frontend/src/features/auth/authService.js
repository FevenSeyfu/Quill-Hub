import axios from 'axios';
const BASE_URL =import.meta.env.VITE_API_URL;
const USERS_URL = `${BASE_URL}/users/`;


const register = async(userData)=>{
    const response =await axios.post(USERS_URL,userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const login = async(userData)=>{
    const response =await axios.post(USERS_URL + 'login',userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService