import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const registerUser = async (request,response) => {
    const {firstName,lastName,birthDate,userName,profileImage,password,email} = request.body
    try{
        if(
            !firstName ||!lastName || !userName ||!birthDate||!password || !email ){
            return response.status(400).send({ message: 'send all required fields: firstname,lastname,email,password...'});
        }
        // check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            return response.status(400).send({ message: 'User already exists!'});
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        // create user
        const newUser = {
            firstName,
            lastName,
            birthDate,
            profileImage,
            userName,
            email,
            password:hashedPassword,
        }
        const user = await User.create(newUser);
        return response.status(201).send(user);
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