import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  const handleLogout = () => {
    // Handle your logout functionality here, for example:
    navigate("/logout");
    setShowProfileCard(false); // Close the profile menu after logout
  };

  return (
    <div className="relative">
      {/* Profile Picture */}
      <button onClick={toggleProfileCard}>
        <img
          src="pfp.png"
          alt="Profile"
          width={50}
          className="w-12 h-12 rounded-full border-2 border-white shadow-md hover:shadow-lg transition duration-200 ml-5"
        />
      </button>

      {/* Dropdown Card */}
      {showProfileCard && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              navigate("/profile");
              setShowProfileCard(false); // Close menu after navigation
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            View Profile
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
