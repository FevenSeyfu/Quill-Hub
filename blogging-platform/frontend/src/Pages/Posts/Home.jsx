import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { getPosts,reset } from "../../features/post/postSlice";
import {toast} from 'react-toastify'
// components
import SideBar from "../../components/Home/Side/SideBar";
import Header from "../../components/Home/Header/Header";
import PostsList from "../../components/Home/Main/PostsList";
import RightSideBar from "../../components/Home/Side/RightSideBar";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  
  const {posts,isLoading, isError, message } = useSelector(
    (state) => state.post
  )
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    setSidebarVisible(window.innerWidth > 768); 
    if(isError){
      toast.error(message)
    }

    
    dispatch(getPosts())

    return()=>{
      dispatch(reset())
    }
  }, [user,navigate, isError, message, dispatch]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-row h-full">
            <SideBar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible}/>
            <div className="flex flex-col ">
              <Header sidebarVisible={sidebarVisible} headerName={'My Stories'}/>
              <div className="flex flex-row w-full mt-4">
                <PostsList sidebarVisible={sidebarVisible} posts={posts}/>
                <RightSideBar/>
              </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default Home