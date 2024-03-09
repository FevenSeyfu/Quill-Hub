import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import Modal from 'react-modal';
import { FaTimes,FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

Modal.setAppElement('#root');

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  const handleDate = (dateInput) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateInput);
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
  };
  const { user } = useSelector((state) => state.auth);
  const {_id,firstName,lastName,birthDate,email,profileImage ,userName}= user
  return (
    <Layout>
      <Modal
        isOpen={true}
        contentLabel="User Profile Modal"
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="w-80 mx-24 p-4 bg-white rounded-md shadow-md relative">
          <div className="flex justify-end">
            <button
              className="text-red hover:text-gray"
              onClick={() => navigate("/posts")}
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold px-8 mb-4">User Profile</h2>
            <div>
              {profileImage ?(<img src={profileImage} alt={`${userName} profile Picture`} className="rounded-full w-32 h-32 m-auto"/>):(<FaUserCircle className="w-32 h-32 m-auto"/>)
              }
              <p className="mb-2"><strong>First Name:</strong> {firstName}</p>
              <p className="mb-2"><strong>Last Name:</strong> {lastName}</p>
              {birthDate && (<p className="mb-2"><strong>Birth Date:</strong>{handleDate(birthDate)}</p>)}
              <p className="mb-2"><strong>User Name:</strong> {userName}</p>
              <p className="mb-2"><strong>Email:</strong> {email}</p>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default UserProfile;
