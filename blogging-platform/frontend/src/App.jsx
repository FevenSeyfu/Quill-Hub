import React from 'react'
import {Routes, Route , Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Pages
import Home from './Pages/Posts/Home'
import CreatePosts from './Pages/Posts/CreatePosts'
import ShowPost from './Pages/Posts/ShowPost'
import EditPosts from './Pages/Posts/EditPosts'
import DeletePosts from './Pages/Posts/DeletePosts'

// Auth page
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import UserProfile from './Pages/Auth/UserProfile'



const App = () => {
  const isUserSignedIn = true;
  return (
    <>
      <Routes>
        <Route exact path="/posts" element={isUserSignedIn ? <Home /> : <Navigate to="/users/login" />}>
        </Route>
        <Route path='/posts/create' element={<CreatePosts />} />
        <Route path='/posts/details/:id' element={<ShowPost />} />
        <Route path='/posts/edit/:id' element={<EditPosts />} />
        <Route path='/posts/delete/:id' element={<DeletePosts />} />
        <Route path="/users/" element={<Register/>} />
        <Route path="/users/login" element={<Login/>} />
        <Route path="/users/profile" element={<UserProfile/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App