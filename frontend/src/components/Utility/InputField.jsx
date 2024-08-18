import React from 'react';

const InputField = ({ label, type, id, name, value, onChange, required }) => {
  return (
    <div className='flex flex-col w-auto my-2'>
      <label htmlFor={id} className="block text-sm font-medium text-gray">
        {label}
      </label>
      {type === 'file' ? (
        <input
          type={type}
          id={id}
          name={name}
          className="mt-1 p-2  border border-purple-telemagnet  focus:border-2 focus:border-purple-telemagnet rounded-md outline-none"
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className="mt-1 p-2 border border-purple-telemagnet focus:border-2 focus:outline-purple-telemagnet rounded-md"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;