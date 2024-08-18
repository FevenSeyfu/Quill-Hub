import React from "react";

const InputField = ({ label, type, id, name, value, onChange, required,placeholder }) => {
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-1 text-sm font-medium text-gray"
    >
      {label}
      {type === "file" ? (
        <input
          type={type}
          id={id}
          name={name}
          className="w-full  p-2 border border-purple-telemagnet  focus:border-purple-telemagnet rounded-xl outline-none grow-1"
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className="min-w-full py-2 px-4  border border-purple-telemagnet focus:outline-purple-telemagnet rounded-xl flex-1"
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};

export default InputField;
