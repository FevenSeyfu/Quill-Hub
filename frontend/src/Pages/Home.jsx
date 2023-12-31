import React, {useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../features/post/postSlice";
import {toast} from 'react-toastify'


// components
import Layout from "../components/Layout";
import PostsList from "../components/Home/Main/PostsList";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let sidebarVisible = window.innerWidth > 768;
  
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    dispatch(getAllPosts())
  }, [dispatch]);
  const {posts,isLoading,isSuccess, isError, message } = useSelector(
    (state) => state.post
  )
  return (
    <Layout headerName={'Explore'}>
      {isLoading ? (
        <Spinner />
      ): isSuccess && posts.length === 0 ? (
        'No Posts Yet'
      ) : (
        <PostsList posts={posts}/>
      )}
    </Layout>
  )
}

export default Home