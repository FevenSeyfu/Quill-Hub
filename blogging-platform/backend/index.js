import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'; 
import { searchPosts } from './controllers/postControllers.js';
import usersRoute from './routes/usersRoute.js';
import postsRoute from './routes/postsRoute.js';
import commentsRoute from './routes/commentsRoute.js';
import bodyParser from 'body-parser';
import { Post } from './models/postsModel.js';
dotenv.config()
const app = express();


app.use(bodyParser.json({limit: '5mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
    parameterLimit: 50000,
  }),
);
app.use(express.json());
// middleware to handle cors policy  
// allow all origins for now

app.use(cors())

// define routes
app.get('/',async (request,response)=>{
    try{
        const posts = await Post.find({});
        return response.status(200).send(posts);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})
// define routes
app.get('/posts/search', searchPosts);
app.use('/users',usersRoute);
app.use('/posts',postsRoute);
app.use('/comments', commentsRoute);

// catch-all route for handling unknown routes
app.use((request, response) => {
    response.status(404).json({ message: 'Route not found' });
  });
  
  // error handling middleware
  app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({ message: 'Internal Server Error' });
  });
// lets connect to db
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('App connected to database');
    app.listen(5555 || process.env.PORT ,()=>{
        console.log(`App is listening to Port : ${process.env.PORT}`)
    })
}).catch((error)=> {
        console.log(error)
})