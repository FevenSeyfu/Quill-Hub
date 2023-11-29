// import { User } from '../models/userModel.js';

export const registerUser = async (request,response) => {
        
    try{
        return response.status(201).send('registration success');
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
}

export const loginUser = async (request,response) => {
    try{
        return response.status(201).send('login success');
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
}

export const getMe = async (request,response)=>{
    try{
        return response.status(201).send('fetch user info');
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}