// Button.jsx
import React from 'react';

const Button = ({ type = 'submit', onClick, children, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      className="text-lg font-bold text-white  bg-soft-orange rounded-full my-2 py-2 px-6 hover:bg-[#ffbab0] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;