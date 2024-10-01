// import React, { useState } from "react";
// import InputEntry from "../components/InputEntry";
// import useAuth from "../store/Auth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import LINK from "../store/Link";
// import InputEntryPassword from "../components/InputEntryPassword";
// import Loader from "../components/Loader";

// function Register() {
//   const navigate = useNavigate();
//   const currToken = localStorage.getItem("hackathon-token");
//   const { storeTokenInLS } = useAuth();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     location: "",
//     industry: "",
//     userType: "Alumni",
//     match: true,
//     bio: "",
//     bioString: "",
//   });
//   const [isLoading, setLoading] = useState(false);

//   React.useEffect(() => {
//     if (currToken) {
//       navigate("/home");
//     }
//   }, [currToken, navigate]);

//   function updateUser(event) {
//     const { name, value } = event.target;
//     setUser((prevUser) => {
//       const updatedUser = {
//         ...prevUser,
//         [name]: value,
//       };
//       updatedUser.match = updatedUser.password === updatedUser.confirmPassword;
//       return updatedUser;
//     });
//   }

//   async function storeData() {
//     if (!user.match) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(user.email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     if (user.phone.length !== 10 || isNaN(user.phone)) {
//       toast.error("Phone number must be exactly 10 digits.");
//       return;
//     }

//     if (user.userType === "Student") user.bio = "Currently Studying at ";
//     else user.bio = "Currently Working at ";
//     user.bio = user.bio + user.bioString;

//     setLoading(true);
//     const response = await fetch(LINK + "api/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
//     setLoading(false);
//     if (response.ok) {
//       toast("Successfully Registered");
//       const resp_data = await response.json();
//       await storeTokenInLS(resp_data.token);
//       navigate("/");
//     } else {
//       const res_data = await response.json();
//       console.log(res_data.extraDetails);
//       toast("User Already Exists !");
//     }
//   }

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           {currToken == null && (
//             <>
//               <div className="flex flex-col justify-center items-center text-center">
//                 <h1 className="text-5xl mt-10 mb-6">
//                   Welcome To Register Page
//                 </h1>
//                 <InputEntry
//                   changeFunction={updateUser}
//                   name="username"
//                   text="Username"
//                   placeholder="Enter Your Name"
//                   value={user.username}
//                 />
//                 <InputEntry
//                   changeFunction={updateUser}
//                   name="email"
//                   text="Email"
//                   placeholder="Enter Your Email"
//                   value={user.email}
//                 />
//                 <InputEntry
//                   changeFunction={updateUser}
//                   name="phone"
//                   text="Phone Number"
//                   placeholder="Enter Your Phone Number"
//                   value={user.phone}
//                 />
//                 <InputEntryPassword
//                   changeFunction={updateUser}
//                   name="password"
//                   text="Password"
//                   placeholder="Enter Your Password"
//                   value={user.password}
//                 />
//                 <InputEntryPassword
//                   changeFunction={updateUser}
//                   name="confirmPassword"
//                   text="Confirm Password"
//                   placeholder="Re-Enter Your Password"
//                   value={user.confirmPassword}
//                 />

//                 <InputEntry
//                   changeFunction={updateUser}
//                   name="location"
//                   text="Location"
//                   placeholder="Enter Your Location"
//                   value={user.location}
//                 />

//                 <div className="mt-8 flex flex-col items-center justify-center">
//                   <label className="block text-white text-[1.25rem] leading-[1.75rem] mb-2">
//                     User Type
//                   </label>
//                   <div className="flex items-center mt-2">
//                     <label className="text-white text-[1.25rem] leading-[1.75rem] mr-6">
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="Alumni"
//                         checked={user.userType === "Alumni"}
//                         onChange={updateUser}
//                         className="mr-3"
//                       />
//                       Alumni
//                     </label>
//                     <label className="text-white text-[1.25rem] leading-[1.75rem]">
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="Student"
//                         checked={user.userType === "Student"}
//                         onChange={updateUser}
//                         className="mr-1"
//                       />
//                       Student
//                     </label>
//                   </div>

//                   <div className="mt-8">
//                     {user.userType === "Student" ? (
//                       <InputEntry
//                         changeFunction={updateUser}
//                         name="bioString"
//                         text="Currently Studying at"
//                         placeholder="Enter College Name"
//                         value={user.bioString}
//                       />
//                     ) : (
//                       <InputEntry
//                         changeFunction={updateUser}
//                         name="bioString"
//                         text="Currently Working at"
//                         placeholder="Enter Company Name"
//                         value={user.bioString}
//                       />
//                     )}
//                   </div>

//                   <div className="mt-1">
//                     <label
//                       className="block text-white text-[1.25rem] leading-[1.75rem] mb-2"
//                       htmlFor="industry"
//                     >
//                       Industry
//                     </label>
//                     <select
//                       name="industry"
//                       id="industry"
//                       value={user.industry}
//                       onChange={updateUser}
//                       className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="" disabled>
//                         Select Your Industry
//                       </option>
//                       <option value="Technology">Technology</option>
//                       <option value="Healthcare">Healthcare</option>
//                       <option value="Finance">Finance</option>
//                       <option value="Education">Education</option>
//                       <option value="Others">Others</option>
//                     </select>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-32 h-12 customButton mt-8"
//                   onClick={storeData}
//                 >
//                   Submit
//                 </button>
//                 {!user.match ? (
//                   <h3 className="mt-3 text-xl text-red-400">
//                     Passwords Do Not Match
//                   </h3>
//                 ) : null}

//                 <h2 className="text-3xl mt-7 mb-4">Already have an Account?</h2>
//                 <button
//                   className="customButton h-12 w-32"
//                   onClick={() => navigate("/login")}
//                 >
//                   Login
//                 </button>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// }

// export default Register;
