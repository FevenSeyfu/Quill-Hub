import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  // test data
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    profileImage: 'https://example.com/profile.jpg',
    userName: 'john_doe',
    email: 'john@example.com',
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-telemagnet">
      <div className="max-w-6xl w-3/6  mx-auto rounded p-8 bg-soft-white shadow-md ">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="flex items-center justify-center mb-4">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="text-gray-600">{`@${user.userName}`}</p>
          </div>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Birth Date:</span> {user.birthDate}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
        <Link to="/edit-profile" className="text-blue-500 hover:underline">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
