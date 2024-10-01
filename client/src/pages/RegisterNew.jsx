// import React, { useState } from "react";
// import InputEntry from "../components/InputEntry";
// import useAuth from "../store/Auth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import InputEntryPassword from "../components/InputEntryPassword";

// function RegisterNew() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     match: true,
//   });

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

//   function handleSubmit() {
//     if (!user.match) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     if (user.phone.length !== 10 || isNaN(user.phone)) {
//       toast.error("Phone number must be exactly 10 digits.");
//       return;
//     }

//     // Navigate to new page with user data (without submitting to backend yet)
//     navigate("/completeprofile", { state: { user } });
//   }

//   return (
//     <div className="flex flex-col justify-center items-center text-center">
//       <h1 className="text-5xl mt-10 mb-6">Register</h1>
//       <InputEntry
//         changeFunction={updateUser}
//         name="username"
//         text="Username"
//         placeholder="Enter Your Name"
//         value={user.username}
//       />
//       <InputEntry
//         changeFunction={updateUser}
//         name="email"
//         text="Email"
//         placeholder="Enter Your Email"
//         value={user.email}
//       />
//       <InputEntry
//         changeFunction={updateUser}
//         name="phone"
//         text="Phone Number"
//         placeholder="Enter Your Phone Number"
//         value={user.phone}
//       />
//       <InputEntryPassword
//         changeFunction={updateUser}
//         name="password"
//         text="Password"
//         placeholder="Enter Your Password"
//         value={user.password}
//       />
//       <InputEntryPassword
//         changeFunction={updateUser}
//         name="confirmPassword"
//         text="Confirm Password"
//         placeholder="Re-Enter Your Password"
//         value={user.confirmPassword}
//       />

//       <button
//         type="submit"
//         className="w-32 h-12 customButton mt-8"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

// export default RegisterNew;
import React, { useState } from "react";
import InputEntry from "../components/InputEntry";
import InputEntryPassword from "../components/InputEntryPassword";
import { useNavigate } from "react-router-dom";

function RegisterNew() {
    const [user, setUser] = useState({ username: "", email: "", phone: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();

    function updateUser(event) {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    function handleSubmit() {
        // Your submit logic here
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 mt-5">
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg">
                <h1 className="mb-6 text-5xl text-center text-black">Register</h1>
                
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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

                    {/* Centering the submit button */}
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="w-32 h-12 customButton"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Centering the 'Already have an Account?' section */}
                    <div className="flex flex-col items-center mt-7">
                        <h2 className="text-3xl mb-4 text-black text-center">
                            Already have an Account?
                        </h2>
                        <button
                            className="customButton h-12 w-32"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterNew;
