import React from 'react'
import {Routes, Route , Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './Pages/Home'
// post Pages
import MyPosts from './Pages/Posts/MyPosts'
import CreatePosts from './Pages/Posts/CreatePosts'
import ShowPost from './Pages/Posts/ShowPost'
import EditPost from './Pages/Posts/EditPost'
import DeletePost from './Pages/Posts/DeletePost'

// Auth page
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import UserProfile from './Pages/Auth/UserProfile'

// comments Page
import CreateComment from './Pages/Comments/CreateComment'
import DeleteComment from './Pages/Comments/DeleteComment'
import EditComment from './Pages/Comments/EditComment'
import LikeComment from './Pages/Comments/LikeComment'
import ShowComments from './Pages/Comments/ShowComments'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/posts/' element={<MyPosts />} />
        <Route path='/posts/create' element={<CreatePosts />} />
        <Route path='/posts/details/:id' element={<ShowPost />} />
        <Route path='/posts/edit/:id' element={<EditPost />} />
        <Route path='/posts/delete/:id' element={<DeletePost />} />
          {/* for user registration */}
        <Route path="/users/" element={<Register/>} />
        <Route path="/users/login" element={<Login/>} />
        <Route path="/users/profile" element={<UserProfile/>} />

        {/* for commenting system */}
        <Route path='/posts/:postId/comments/create' element={<CreateComment />} />
        <Route path='/posts/comments/:postId/' element={<ShowComments />} />
        <Route path='/posts/:postId/comments/edit/:commentId' element={<EditComment />} />
        <Route path='/posts/:postId/comments/delete/:commentId' element={<DeleteComment />} />
        <Route path='/posts/:postId/comments/:commentId/like' element={<LikeComment />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App