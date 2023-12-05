import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import Header from "../../components/Home/Header/Header";
import Modal from 'react-modal';
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

Modal.setAppElement('#root');

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {_id,firstName,lastName,birthDate,email,profileImage ,userName}= user.user
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
              <img src={profileImage} alt={`${userName} profile Picture`} className="rounded-full w-64 h-64 m-auto"/>
              <p className="mb-2"><strong>ID:</strong> {_id}</p>
              <p className="mb-2"><strong>First Name:</strong> {firstName}</p>
              <p className="mb-2"><strong>Last Name:</strong> {lastName}</p>
              <p className="mb-2"><strong>Birth Date:</strong> {birthDate}</p>
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
