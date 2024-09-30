import React from 'react';

const TextAreaField = ({ label, name, value, handleChange, placeholder }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        rows="4"
        required
    />

    </div>
  );
};

export default TextAreaField;
