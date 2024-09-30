import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";
import { GoOrganization } from "react-icons/go";
import AddEducationPage from "../components/AddEducationPage";
import AddExperiencePage from "../components/AddExperiencePage";
import useAuth from "../store/Auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
    }
  }, [isLoggedIn]);

  const [isEduOpen, setEduOpen] = useState(false);
  const [isExpOpen, setExpOpen] = useState(false);

  const [achievements, setAchievements] = useState([
    "Achievement 1",
    "Achievement 2",
  ]);
  const [education, setEducation] = useState([
    {
      institution: "Shri T.P Bhatia Junior College",
      course: "Science",
      start: "2020",
      end: "2022",
    },
    {
      institution: "Thadomal Shahani Engineering College",
      course: "B.E in Information Technology",
      start: "2022",
      end: "2026",
    },
  ]);
  const [experience, setExperience] = useState([
    {
      company: "Oracle",
      role: "Software Engineer",
      type: "Full-time",
      start: "Aug 2020",
      end: "Feb 2021",
      location: "Mumbai",
    },
    {
      company: "Barclays",
      role: "Intern",
      type: "Part-time",
      start: "Jun 2021",
      end: "Present",
      location: "Pune",
    },
  ]);

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "New Company",
        role: "New Role",
        type: "Part-time",
        start: "2023",
        end: "Present",
        location: "New Location",
      },
    ]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Icon"
          className="w-32 h-32 rounded-full object-cover border-4 border-white"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            Student
          </span>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Achievements
          </h2>
          <a onClick={() => console.log("Add Achievement Clicked")}>
            <FaPlus className="hover:bg-gray-200 rounded-full p-3" size={40} />
          </a>
        </div>
        <ul className="space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="p-4 bg-white rounded shadow-sm">
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      {/* Education Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Education
          </h2>
          <a onClick={() => setEduOpen(true)}>
            <FaPlus className="hover:bg-gray-200 rounded-full p-3" size={40} />
          </a>
        </div>
        {isEduOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <AddEducationPage
              setEducation={setEducation}
              education={education}
              setOpen={setEduOpen}
            />
          </div>
        )}
        <ul className="space-y-2">
          {education.map((edu, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
            >
              <LiaUniversitySolid />
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{edu.institution}</span>
                <span className="text-sm text-gray-700">{edu.course}</span>
                <span className="font-normal text-sm text-gray-400">
                  {edu.start} - {edu.end}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Experience Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Experience
          </h2>
          <a
            onClick={() => {
              setExpOpen(true);
            }}
          >
            <FaPlus className="hover:bg-gray-200 rounded-full p-3" size={40} />
          </a>
          {isExpOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <AddExperiencePage
                setOpen={setExpOpen}
                setExperience={setExpOpen}
                experience={experience}
              />
            </div>
          )}
        </div>
        <ul className="space-y-2">
          {experience.map((exp, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
            >
              <GoOrganization />
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{exp.role}</span>
                <span className="text-gray-700 text-sm">
                  {exp.company} . {exp.type}
                </span>
                <span className="text-gray-500 text-sm">
                  {exp.start} - {exp.end}
                </span>
                <span className="text-gray-400 text-sm flex flex-row items-center gap-1">
                  {exp.location}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
