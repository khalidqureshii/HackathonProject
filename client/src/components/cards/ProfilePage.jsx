import React, { useEffect, useState } from "react";
import { LiaUniversitySolid } from "react-icons/lia";
import { GoOrganization } from "react-icons/go";
import {useAuth} from "../../store/Auth";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useLocation } from 'react-router-dom';
import LINK from "../../store/Link";

function ProfilePage () {
  const { isLoggedIn, token} = useAuth();
  const navigate = useNavigate();
  const [profileUser, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const { userId } = location.state || {};
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isClicked, setClick] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchProfileData();
    }
  }, []);

  const fetchCurrProfileData = async () => {
    try {
      setLoading(true);
      const userInfo = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await userInfo.json();
      
      if (!userInfo.ok) {
        throw new Error(data.message || "Failed to fetch user data");
      }
  
      const currUserId = data.msg._id;

      console.log("User ID: " + profileUser._id);
      console.log("Curr User ID: " + currUserId);
  
      let userIncoming = profileUser.incoming || [];
      
      if (!userIncoming.includes(currUserId)) {
        userIncoming = [...userIncoming, currUserId];
      }
      console.log(userIncoming);
      const updateResponse = await fetch("http://localhost:5000/api/filter/updateIncoming", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: profileUser._id,  
          incoming: userIncoming,
        }),
      });
  
      const updateData = await updateResponse.json();
  
      if (!updateResponse.ok) {
        throw new Error(updateData.message || "Failed to update incoming list");
      }
  
      console.log("Successfully updated incoming list:", updateData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Error fetching data: " + error.message); 
    } finally {
      setLoading(false);
    }
  };


  async function fetchProfileData () {
    setLoading(true);
    const response = await fetch(LINK + "api/filter/getUserProfile", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({userId})
    });
    const data = await response.json();
    const userData = data.filteredProfiles[0];
    setUser(userData);
    setEducation(userData.education);
    setExperience(userData.experience);
    setLoading(false);
  };

  function connectWithUser() {
    setClick(true);
    fetchCurrProfileData();
  }


  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center space-x-4 mb-8">
            <img
              src="/pfp.png"
              alt="Profile Icon"
              width={50}
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{profileUser.username}</h1>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {profileUser.userType}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Experience
            </h2>
            <ul className="space-y-2">
              {experience.length === 0 ? (
                <h2 className="text-black">No Experience Records</h2>
              ) : (
                experience.map((exp, index) => (
                  <li
                    key={index}
                    className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
                  >
                    <GoOrganization />
                    <div className="flex flex-col w-full">
                      <span className="font-semibold text-lg">{exp.role}</span>
                      <span className="text-gray-700 text-sm">
                        {exp.company} . {exp.type}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {exp.startYear} - {exp.endYear}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {exp.description}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Education
            </h2>
            <ul className="space-y-2">
              {education.length === 0 ? (
                <h2 className="text-black">No Education Records</h2>
              ) : (
                education.map((edu, index) => (
                  <li
                    key={index}
                    className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
                  >
                    <LiaUniversitySolid />
                    <div className="flex flex-col w-full">
                      <span className="font-semibold text-lg">
                        {edu.university}
                      </span>
                      <span className="text-sm text-gray-700">{edu.course}</span>
                      <span className="font-normal text-sm text-gray-400">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          {!isClicked?(<button className="customButton h-12 w-32" onClick={connectWithUser}>Connect</button>):
          (<button className="customButton h-12 w-48" >Request Sent</button>)}
        </>
      )}
    </div>
  )
};

export default ProfilePage