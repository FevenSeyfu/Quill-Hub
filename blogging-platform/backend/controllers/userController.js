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
        return response.status(201)
        .json({
            message:'User registered Successfully!',success: true, 
            user:user,
            token: generateToken(user._id)
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
}

export const loginUser = async (request,response) => {
    const {password,email} = request.body
    try{
        // check for user email
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            return response.status(201).json({
                userName: user.userName,
                id:user._id,
                email:user.email,
                token: generateToken(user._id),
                message:'Signed in Successfully!',success: true,
            });
        }else{
            response.status(400).send('invalid credential');
        }
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
}

export const getMe = async (request,response)=>{
    const {_id,firstName,lastName,birthDate,userName,profileImage,email} = await User.findById(request.user.id)
    try{
        return response.status(200).json({
            id:_id,
            firstName,
            lastName,
            birthDate,
            profileImage,
            userName,
            email,
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

// Generate Token

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}