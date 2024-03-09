import React, {useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../features/post/postSlice";
import {toast} from 'react-toastify'


// components
import Layout from "../../components/Layout";
import PostsList from "../../components/Home/Main/PostsList";


const MyPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  let sidebarVisible = window.innerWidth > 768;
  const {posts,isLoading,isSuccess, isError, message } = useSelector(
    (state) => state.post
  )
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
  
    if (!user) {
      navigate('/users/login')
    }
    dispatch(getPosts())

  }, [user,navigate, isError, message, dispatch]);
  return (
    <Layout headerName={'My Stories'}>
      {isLoading ? (
        <Spinner />
      ): isSuccess && posts.length === 0 ? (
        'No Posts Yet'
      ) :  (
        <PostsList sidebarVisible={sidebarVisible} posts={posts}/>
      )}
    </Layout>
  )
}

export default MyPosts