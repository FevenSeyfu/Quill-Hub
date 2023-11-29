import React from 'react'
import {Routes, Route , Navigate} from 'react-router-dom'

// Pages
import Home from './Pages/Posts/Home'
import CreatePosts from './Pages/Posts/CreatePosts'
import ShowPosts from './Pages/Posts/ShowPosts'
import EditPosts from './Pages/Posts/EditPosts'
import DeletePosts from './Pages/Posts/DeletePosts'

// Auth page
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import UserProfile from './Pages/Auth/UserProfile'


const App = () => {
  const isUserSignedIn = true;
  return (
    <Routes>
      <Route exact path="/" element={isUserSignedIn ? <Home /> : <Navigate to="/login" />}>
      </Route>
      <Route path='/posts/create' element={<CreatePosts />} />
      <Route path='/posts/details/:id' element={<ShowPosts />} />
      <Route path='/posts/edit/:id' element={<EditPosts />} />
      <Route path='/posts/delete/:id' element={<DeletePosts />} />
      <Route path="/users/" element={<Register/>} />
      <Route path="/users/login" element={<Login/>} />
      <Route path="/users/profile" element={<UserProfile/>} />
    </Routes>
  )
}

export default App