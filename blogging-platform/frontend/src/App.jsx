import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Pages
import Home from './Pages/Posts/Home'
import CreatePosts from './Pages/Posts/CreatePosts'
import ShowPosts from './Pages/Posts/ShowPosts'
import EditPosts from './Pages/Posts/EditPosts'
import DeletePosts from './Pages/Posts/DeletePosts'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/posts/create' element={<CreatePosts />} />
      <Route path='/posts/details/:id' element={<ShowPosts />} />
      <Route path='/posts/edit/:id' element={<EditPosts />} />
      <Route path='/posts/delete/:id' element={<DeletePosts />} />
    </Routes>
  )
}

export default App