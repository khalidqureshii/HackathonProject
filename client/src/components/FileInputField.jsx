import React from 'react';

const FileInputField = ({ label, name, handleImageChange }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleImageChange}
        className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        accept="image/*"
      />
    </div>
  );
};

export default FileInputField;
