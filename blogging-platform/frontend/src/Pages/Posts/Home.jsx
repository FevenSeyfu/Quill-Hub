import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";

// components
import SideBar from "../../components/Home/Side/SideBar";
import Header from "../../components/Home/Header/Header";
import PostsList from "../../components/Home/Main/PostsList";
import LeftSideBar from "../../components/Home/Side/LeftSideBar";

const Home = () => {
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/posts")
      .then((response) => {
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
            <SideBar />
            <div className="flex flex-col w-full">
              <Header/>
              <div className="flex flex-row w-full">
                <PostsList />
                <LeftSideBar/>
              </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default Home