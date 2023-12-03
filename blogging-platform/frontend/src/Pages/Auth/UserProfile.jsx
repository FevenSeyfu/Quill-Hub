import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import Header from "../../components/Home/Header/Header";
import Modal from 'react-modal';
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <>
      <Header sidebarVisible={true} headerName={"User Profile"} />
      <Modal
        isOpen={true}
        contentLabel="User Profile Modal"
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-md shadow-md relative">
          <div className="flex justify-end">
            <button
              className="text-red hover:text-gray"
              onClick={() => navigate("/posts")}
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div>
              <p className="mb-2"><strong>ID:</strong> {user?.id}</p>
              <p className="mb-2"><strong>First Name:</strong> {user?.firstName}</p>
              <p className="mb-2"><strong>Last Name:</strong> {user?.lastName}</p>
              <p className="mb-2"><strong>Birth Date:</strong> {user?.birthDate}</p>
              <p className="mb-2"><strong>User Name:</strong> {user?.userName}</p>
              <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;
