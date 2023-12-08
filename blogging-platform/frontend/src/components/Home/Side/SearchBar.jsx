import React,{ useEffect, useState }  from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { searchPosts, reset } from "../../../features/post/postSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = async (e) => {
      e.preventDefault();
      await dispatch(searchPosts(searchTerm));
    };
    useEffect(() => {
      return () => {
        dispatch(reset());
      };
    }, [dispatch]);
  return (
    <div className="">
      <div className="flex items-center bg-white border-b rounded-full p-2">
        <IoSearch className="text-gray-500" />
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
