import React, { useState } from 'react';
import InputField from './InputField.jsx';
import TextAreaField from './TextAreaField.jsx';
import FileInputField from './FileInputField.jsx';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Post submitted successfully!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            handleChange={handleChange}
            placeholder="Enter post title"
          />
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            handleChange={handleChange}
            placeholder="Enter post description"
          />
          <FileInputField
            label="Image"
            name="image"
            handleImageChange={handleImageChange}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
