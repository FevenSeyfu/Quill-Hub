// Button.jsx
import React from 'react';

const Button = ({ type = 'submit', onClick, children, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      className="w-full text-lg font-bold text-white  bg-soft-orange rounded-full my-2 py-2 px-6 hover:bg-secondary-orange-hover disabled:bg-secondary-orange-disabled disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;