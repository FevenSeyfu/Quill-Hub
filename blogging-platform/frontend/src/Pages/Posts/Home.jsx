import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../../components/Spinner";

// components
import SideBar from "../../components/Home/Side/SideBar";
import Header from "../../components/Home/Header/Header";
import PostsList from "../../components/Home/Main/PostsList";
import RightSideBar from "../../components/Home/Side/RightSideBar";

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const [posts, setPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    setSidebarVisible(window.innerWidth > 768); 

    setLoading(true);
    axios
      .get("http://localhost:5555/posts")
      .then((response) => {
        console.log(response.data)
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-row h-full">
            <SideBar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible}/>
            <div className="flex flex-col ">
              <Header sidebarVisible={sidebarVisible}/>
              <div className="flex flex-row w-full">
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