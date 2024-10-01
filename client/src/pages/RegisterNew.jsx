import React, { useState } from "react";
import InputEntry from "../components/InputEntry";
import useAuth from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputEntryPassword from "../components/InputEntryPassword";

function RegisterNew() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    match: true,
  });

  function updateUser(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        [name]: value,
      };
      updatedUser.match = updatedUser.password === updatedUser.confirmPassword;
      return updatedUser;
    });
  }

  function handleSubmit() {
    if (!user.match) {
      toast.error("Passwords do not match!");
      return;
    }

    if (user.phone.length !== 10 || isNaN(user.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    // Navigate to new page with user data (without submitting to backend yet)
    navigate("/completeprofile", { state: { user } });
  }

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl mt-10 mb-6">Register</h1>
      <InputEntry
        changeFunction={updateUser}
        name="username"
        text="Username"
        placeholder="Enter Your Name"
        value={user.username}
      />
      <InputEntry
        changeFunction={updateUser}
        name="email"
        text="Email"
        placeholder="Enter Your Email"
        value={user.email}
      />
      <InputEntry
        changeFunction={updateUser}
        name="phone"
        text="Phone Number"
        placeholder="Enter Your Phone Number"
        value={user.phone}
      />
      <InputEntryPassword
        changeFunction={updateUser}
        name="password"
        text="Password"
        placeholder="Enter Your Password"
        value={user.password}
      />
      <InputEntryPassword
        changeFunction={updateUser}
        name="confirmPassword"
        text="Confirm Password"
        placeholder="Re-Enter Your Password"
        value={user.confirmPassword}
      />

      <button
        type="submit"
        className="w-32 h-12 customButton mt-8"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default RegisterNew;
