import express from 'express';
import { User } from '../modals/usersModal.js';

const router = express.Router();
// route to add new user
router.post('/', async (request,response) => {
        
    try{
        if(
            !request.body.firstName || 
            !request.body.lastName  || 
            !request.body.firstName || 
            !request.body.birthDate || 
            !request.body.userName  ||
            !request.body.password ||
            !request.body.email ){
            return response.status(400).send({ message: 'send all required fields: firstname,lastname,email,password...'});
        }
        const newUser = {
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            birthDate:request.body.birthDate,
            profileImage:request.body.profileImage,
            userName:request.body.userName,
            email:request.body.email,
            password:request.body.password,
        }
        const user = await User.create(newUser);
        return response.status(201).send(user);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});
// route to get all user
router.get('/',async (request,response)=>{
    try{
        const users = await User.find({});
        return response.status(200).json({
            count: users.length,
            data:users
        }
        );
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})
// route to get users by id
router.get('/:id', async (request,response)=>{
    try{
        const {id} = request.params;
        const user = await User.findById(id);
        return response.status(200).json({
            data:user
        }
        );
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})
// route to Update post
router.put('/:id', async (request,response)=>{
    try{
        if(
            !request.body.firstName || 
            !request.body.lastName  || 
            !request.body.firstName || 
            !request.body.birthDate || 
            !request.body.userName  ||
            !request.body.password ||
            !request.body.email ){
            return response.status(400).send({ message: 'send all required fields: firstname,lastname,email,password...'});
        }
        const {id} = request.params;
        const result = await User.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message: 'User not found'})
        }
        return response.status(200).send({message: 'User Updated successfuly'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})
// route to Delete a post
router.delete('/:id', async (request,response)=>{
    try{
        const {id} = request.params;
        const result = await User.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: 'User not found'})
        }
        return response.status(200).send({message: 'User Deleted successfuly'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

export default router;