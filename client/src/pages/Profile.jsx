// import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { LiaUniversitySolid } from "react-icons/lia";
// import { GoOrganization } from "react-icons/go";
// import AddEducationPage from "../components/AddEducationPage";
// import AddExperiencePage from "../components/AddExperiencePage";
// import useAuth from "../store/Auth";
// import { useNavigate } from "react-router-dom";
// import Loader from "../components/Loader";
// import { MdOutlineDelete } from "react-icons/md";

// const Profile = () => {
//   const { isLoggedIn, token } = useAuth();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [education, setEducation] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [isEduOpen, setEduOpen] = useState(false);
//   const [isExpOpen, setExpOpen] = useState(false);
//   const [achievements, setAchievements] = useState([
//     "Achievement 1",
//     "Achievement 2",
//   ]);
//   const [loading, setLoading] = useState(true); // State to track loading

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/login");
//     } else {
//       fetchProfileData(); // Fetch profile data if logged in
//     }
//   }, [isLoggedIn]);

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true);
//       const userInfo = await fetch("http://localhost:5000/api/auth/user", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await userInfo.json();
//       if (!userInfo.ok) {
//         throw new Error(data.message || "Failed to fetch user data");
//       }
//       console.log(data);
//       setEducation(data.msg.education);
//       setExperience(data.msg.experience);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//       alert("Error fetching data: " + error.message); // Basic error alert
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-gray-100">
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           {/* Profile Section */}
//           <div className="flex items-center space-x-4 mb-8">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Profile Icon"
//               className="w-32 h-32 rounded-full object-cover border-4 border-white"
//             />
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
//               <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
//                 Student
//               </span>
//             </div>
//           </div>

//           {/* Achievements Section */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//                 Achievements
//               </h2>
//               <a onClick={() => console.log("Add Achievement Clicked")}>
//                 <FaPlus
//                   className="hover:bg-gray-200 rounded-full p-3"
//                   size={40}
//                 />
//               </a>
//             </div>
//             <ul className="space-y-2">
//               {achievements.map((achievement, index) => (
//                 <li key={index} className="p-4 bg-white rounded shadow-sm">
//                   {achievement}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Education Section */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//                 Education
//               </h2>
//               <a onClick={() => setEduOpen(true)}>
//                 <FaPlus
//                   className="hover:bg-gray-200 rounded-full p-3"
//                   size={40}
//                 />
//               </a>
//             </div>
//             {isEduOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <AddEducationPage
//                   setEducation={setEducation}
//                   education={education}
//                   setOpen={setEduOpen}
//                 />
//               </div>
//             )}
//             <ul className="space-y-2">
//               {education &&
//                 education.map((edu, index) => (
//                   <li
//                     key={index}
//                     className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
//                   >
//                     <LiaUniversitySolid />
//                     <div className="flex flex-col w-full">
//                       <div className="flex flex-row w-full items-center justify-between">
//                         <span className="font-semibold text-lg">
//                           {edu.university}
//                         </span>
//                         <a className="hover:opacity-60 cursor-pointer">
//                           <MdOutlineDelete size={25} />
//                         </a>
//                       </div>
//                       <span className="text-sm text-gray-700">
//                         {edu.course}
//                       </span>
//                       <span className="font-normal text-sm text-gray-400">
//                         {edu.startYear} - {edu.endYear}
//                       </span>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>

//           {/* Experience Section */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//                 Experience
//               </h2>
//               <a
//                 onClick={() => {
//                   setExpOpen(true);
//                 }}
//               >
//                 <FaPlus
//                   className="hover:bg-gray-200 rounded-full p-3"
//                   size={40}
//                 />
//               </a>
//               {isExpOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                   <AddExperiencePage
//                     setOpen={setExpOpen}
//                     setExperience={setExperience}
//                     experience={experience}
//                   />
//                 </div>
//               )}
//             </div>
//             <ul className="space-y-2">
//               {experience &&
//                 experience.map((exp, index) => (
//                   <li
//                     key={index}
//                     className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
//                   >
//                     <GoOrganization />
//                     <div className="flex flex-col w-full">
//                       <div className="flex flex-row justify-between items-center w-full">
//                         <span className=" font-semibold text-lg">
//                           {exp.role}
//                         </span>
//                         <a className="hover:opacity-60 cursor-pointer">
//                           <MdOutlineDelete size={25} />
//                         </a>
//                       </div>
//                       <span className="text-gray-700 text-sm">
//                         {exp.company} . {exp.type}
//                       </span>
//                       <span className="text-gray-500 text-sm">
//                         {exp.startYear} - {exp.endYear}
//                       </span>
//                       <span className="text-gray-400 text-sm flex flex-row items-center gap-1">
//                         {exp.location}
//                       </span>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";
import { GoOrganization } from "react-icons/go";
import AddEducationPage from "../components/AddEducationPage";
import AddExperiencePage from "../components/AddExperiencePage";
import useAuth from "../store/Auth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { MdOutlineDelete } from "react-icons/md";

const Profile = () => {
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isEduOpen, setEduOpen] = useState(false);
  const [isExpOpen, setExpOpen] = useState(false);
  const [achievements, setAchievements] = useState([
    "Achievement 1",
    "Achievement 2",
  ]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchProfileData(); // Fetch profile data if logged in
    }
  }, [isLoggedIn]);

  const fetchProfileData = async () => {
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
      console.log(data);
      setEducation(data.msg.education);
      setExperience(data.msg.experience);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Error fetching data: " + error.message); // Basic error alert
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async (index) => {
    // const eduId = education[index]._id; // Assuming each education has a unique _id
    try {
      const response = await fetch(
        `http://localhost:5000/api/profile/education/delete/${index}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete education");
      }

      setEducation((prevEducation) =>
        prevEducation.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("Error deleting education:", error);
      alert("Error deleting education: " + error.message);
    }
  };

  const deleteExperience = async (index) => {
    const expId = experience[index]._id; // Assuming each experience has a unique _id
    try {
      const response = await fetch(
        `http://localhost:5000/api/profile/experience/delete/${index}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete experience");
      }

      setExperience((prevExperience) =>
        prevExperience.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Error deleting experience: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <>
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
                <FaPlus
                  className="hover:bg-gray-200 rounded-full p-3"
                  size={40}
                />
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
                <FaPlus
                  className="hover:bg-gray-200 rounded-full p-3"
                  size={40}
                />
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
              {education.length === 0 ? (
                <h2>No Education Records</h2>
              ) : (
                education.map((edu, index) => (
                  <li
                    key={index}
                    className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
                  >
                    <LiaUniversitySolid />
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row w-full items-center justify-between">
                        <span className="font-semibold text-lg">
                          {edu.university}
                        </span>
                        <a
                          onClick={() => deleteEducation(index)}
                          className="hover:opacity-60 cursor-pointer"
                        >
                          <MdOutlineDelete size={25} />
                        </a>
                      </div>
                      <span className="text-sm text-gray-700">
                        {edu.course}
                      </span>
                      <span className="font-normal text-sm text-gray-400">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                  </li>
                ))
              )}
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
                <FaPlus
                  className="hover:bg-gray-200 rounded-full p-3"
                  size={40}
                />
              </a>
              {isExpOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <AddExperiencePage
                    setOpen={setExpOpen}
                    setExperience={setExperience}
                    experience={experience}
                  />
                </div>
              )}
            </div>
            <ul className="space-y-2">
              {experience &&
                experience.map((exp, index) => (
                  <li
                    key={index}
                    className="flex flex-row items-center gap-4 p-4 bg-white rounded shadow-sm text-gray-800"
                  >
                    <GoOrganization />
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span className=" font-semibold text-lg">
                          {exp.role}
                        </span>
                        <a
                          onClick={() => deleteExperience(index)}
                          className="hover:opacity-60 cursor-pointer"
                        >
                          <MdOutlineDelete size={25} />
                        </a>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {exp.company} . {exp.type}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {exp.startYear} - {exp.endYear}
                      </span>
                      <span className="text-gray-400 text-sm flex flex-row items-center">
                        <span className="mr-2">Description:</span>
                        <span className="">{exp.description}</span>
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
