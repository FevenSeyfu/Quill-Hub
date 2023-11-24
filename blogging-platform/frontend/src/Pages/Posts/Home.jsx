import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";


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
        <div>
            hello
        </div>
      )}
    </div>
  )
}

export default Home