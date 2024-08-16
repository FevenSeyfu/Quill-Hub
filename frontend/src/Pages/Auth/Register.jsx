import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { register,reset } from "../../features/auth/authSlice.js";
import imageCompression from 'browser-image-compression';
import logoCircle from '../../assets/logo-circle.png'
import WelcomeSection from "../../components/Auth/WelcomeSection.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
      firstName : '',
      lastName : '',
      birthDate: '',
      profileImage : '',
      userName: '',
      email:'',
      password : '',
  })
  const {firstName,lastName,birthDate,userName,email,profileImage,password} = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user,isLoading, isError,isSuccess,message} = useSelector((state)=>state.auth);

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/users/login')
    }

    dispatch(reset());

  },[user, isError,isSuccess,message,navigate,dispatch])
  
  const onChange = async(e) =>{
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];

      if (file) {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.1, 
            maxWidthOrHeight: 800,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            setFormData((prevState) => ({
              ...prevState,
              profileImage: reader.result,
            }));
          };

          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }
  const onSubmit = (e)=>{
    e.preventDefault();
      const userData = {
        firstName,lastName,birthDate,userName,email,profileImage,password,
      }

      dispatch(register(userData))
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-telemagnet">
      <div className="max-w-6xl w-5/6  flex rounded-2xl  bg-soft-white shadow-md ">
      <WelcomeSection />

        <div className="w-full px-2 md:w-3/6 mx-4 md:mb-0 ">
          <div className="flex items-center justify-center mb-2 mt-2">
            <img
              src={logoCircle}
              alt="Logo"
              className="w-24 h-24 rounded-full object-contain"
            />
           </div>
          <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
          {isLoading ? <Spinner /> : ""}
          <form onSubmit={onSubmit}>
            <div className="flex flex-row justify-between gap-2 pb-1">
              <div className="w-3/5">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
                  value={firstName}
                  onChange={onChange}
                />
              </div>
              <div className="w-3/5">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
                  value={lastName}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between gap-2 pb-1">
              <div className="w-3/5">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
                  value={userName}
                  onChange={onChange}
                />
              </div>
              <div className="w-3/5">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
                  value={birthDate}
                  onChange={onChange}
                  required
                />
              
              </div>
            </div>
            <div className="flex flex-row justify-between gap-2 pb-4">
              <div className="w-3/5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="w-3/5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray"
                >
                  Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full pb-2">
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray"
              >
                Insert Profile Picture
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
                onChange={onChange}
              />
            </div>
            <div className="flex  flex-row justify-between items-center mb-4">
              <div className="flex flex-row ">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium text-gray mr-6"
                >
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-3/6 text-white  bg-soft-orange rounded-2xl py-2 ml-20"
              
            >
              Register
            </button>
            <p className="text-sm text-gray mt-2">
                Already have an account?
                <Link
                  to="/users/login"
                  className="text-soft-orange hover:underline"
                >
                  Login
                </Link>
              </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
