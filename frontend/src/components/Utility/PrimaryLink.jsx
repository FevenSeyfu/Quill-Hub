// PrimaryLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-soft-orange font-semibold hover:text-secondary-orange-hover underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;