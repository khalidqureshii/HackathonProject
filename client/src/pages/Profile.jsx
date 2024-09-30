import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Profile = () => {
  const [achievements, setAchievements] = useState([
    "Achievement 1",
    "Achievement 2",
  ]);
  const [education, setEducation] = useState([
    { institution: "University A", year: "2020" },
    { institution: "School B", year: "2018" },
  ]);
  const [experience, setExperience] = useState([
    { company: "Company X", role: "Software Engineer" },
    { company: "Company Y", role: "Intern" },
  ]);

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      `Achievement ${achievements.length + 1}`,
    ]);
  };

  const addEducation = () => {
    setEducation([...education, { institution: "New School", year: "2023" }]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Icon"
          className="w-32 h-32 rounded-full object-cover"
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
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Achievements
        </h2>
        <ul className="space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="p-4 bg-white rounded shadow-sm">
              {achievement}
            </li>
          ))}
        </ul>
        <button
          onClick={addAchievement}
          className="mt-4 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaPlus /> <span>Add Achievement</span>
        </button>
      </div>

      {/* Education Timeline Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Education</h2>
        <ul className="space-y-2">
          {education.map((edu, index) => (
            <li key={index} className="p-4 bg-white rounded shadow-sm">
              {edu.institution} - {edu.year}
            </li>
          ))}
        </ul>
        <button
          onClick={addEducation}
          className="mt-4 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaPlus /> <span>Add Education</span>
        </button>
      </div>

      {/* Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Experience
        </h2>
        <ul className="space-y-2">
          {experience.map((exp, index) => (
            <li key={index} className="p-4 bg-white rounded shadow-sm">
              <strong>{exp.company}</strong> - {exp.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
