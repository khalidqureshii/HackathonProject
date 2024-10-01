import React, { useState } from "react";
import InputField from "./InputField.jsx";
import TextAreaField from "./TextAreaField.jsx";
import FileInputField from "./FileInputField.jsx";
import { useNavigate } from "react-router-dom";
import "../App.css";
import useAuth from "../store/Auth.jsx";

const CreatePost = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postedBy: "",
    title: "",
    description: "",
    image: null,
    isDonation: false,
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

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isDonation: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User->", user);
    const postData = new FormData();
    postData.append("postedBy", user);
    postData.append("title", formData.title);
    postData.append("description", formData.description);
    postData.append("isDonation", formData.isDonation);
    if (formData.image) {
      postData.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST",
        body: postData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        alert("Post submitted successfully!");
        navigate("/"); // Navigate to homepage after successful submission
      } else {
        console.error("Error:", result);
        alert("Failed to submit the post");
      }
    } catch (error) {
      console.error("Error submitting the post:", error);
      alert("Failed to submit the post due to a network error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-custom">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Create a New Post
        </h1>
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDonation"
              name="isDonation"
              checked={formData.isDonation}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="isDonation" className="text-sm text-black">
              Is this post for donation?
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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