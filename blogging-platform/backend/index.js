import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'; 
import usersRoute from './routes/usersRoute';
import postsRoute from './routes/postsRoute';

dotenv.config()
const app = express();
app.use(express.json());

// middleware to handle cors policy
// allow all origins for now

app.use(cors())

// define routes
app.get('/',(req,res)=>{
    return res.status(234).send('welcome to our awesome blogging site')
})
// define routes
app.use('/users',usersRoute);
app.use('/posts',postsRoute);

// lets connect to db
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('App connected to database');
    app.listen(5555 || process.env.PORT ,()=>{
        console.log(`App is listening to Port : ${process.env.PORT}`)
    })
}).catch((error)=> {
        console.log(error)
})