import React from 'react';

const InputField = ({ label, type, id, name, value, onChange, required }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray">
        {label}
      </label>
      {type === 'file' ? (
        <input
          type={type}
          id={id}
          name={name}
          className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className="mt-1 p-2 w-full border-2 focus:border-2 rounded-md"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;