import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import LINK from "../store/Link";
import InputEntry from "../components/InputEntry";

function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialUser = location.state?.user || {}; // Get user data from previous page

  const [user, setUser] = useState({
    ...initialUser,
    location: "",
    industry: "",
    userType: "Alumni",
    bio: "",
    bioString: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  function updateUser(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileImage) {
      toast.error("Please upload a profile image");
      return;
    }
    if (user.userType === "Student") user.bio = "Currently Studying at ";
    else user.bio = "Currently Working at ";
    user.bio = user.bio + user.bioString;
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    // Add other user data to formData
    for (const key in user) {
      formData.append(key, user[key]);
    }

    setLoading(true);
    try {
      const response = await fetch(LINK + "api/auth/register", {
        //-with-image
        method: "POST",
        body: formData,
      });
      setLoading(false);

      if (response.ok) {
        toast.success("Registration successful!");
        navigate("/home");
      } else {
        const res_data = await response.json();
        toast.error(res_data.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl mt-10 mb-6">Complete Your Registration</h1>

          <InputEntry
            changeFunction={updateUser}
            name="location"
            text="Location"
            placeholder="Enter Your Location"
            value={user.location}
          />
          <div className="mt-8 flex flex-col items-center justify-center">
            <label className="block text-white text-[1.25rem] leading-[1.75rem] mb-2">
              User Type
            </label>
            <div className="flex items-center mt-2">
              <label className="text-white text-[1.25rem] leading-[1.75rem] mr-6">
                <input
                  type="radio"
                  name="userType"
                  value="Alumni"
                  checked={user.userType === "Alumni"}
                  onChange={updateUser}
                  className="mr-3"
                />
                Alumni
              </label>
              <label className="text-white text-[1.25rem] leading-[1.75rem]">
                <input
                  type="radio"
                  name="userType"
                  value="Student"
                  checked={user.userType === "Student"}
                  onChange={updateUser}
                  className="mr-1"
                />
                Student
              </label>
            </div>

            <div className="mt-8">
              {user.userType === "Student" ? (
                <InputEntry
                  changeFunction={updateUser}
                  name="bioString"
                  text="Currently Studying at"
                  placeholder="Enter College Name"
                  value={user.bioString}
                />
              ) : (
                <InputEntry
                  changeFunction={updateUser}
                  name="bioString"
                  text="Currently Working at"
                  placeholder="Enter Company Name"
                  value={user.bioString}
                />
              )}
            </div>

            <div className="mt-1">
              <label
                className="block text-white text-[1.25rem] leading-[1.75rem] mb-2"
                htmlFor="industry"
              >
                Industry
              </label>
              <select
                name="industry"
                id="industry"
                value={user.industry}
                onChange={updateUser}
                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Your Industry
                </option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-white text-lg mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-32 h-12 customButton mt-8"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default CompleteProfile;
