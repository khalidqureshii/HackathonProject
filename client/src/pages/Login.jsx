// import React, { useState } from "react";
// import InputEntry from "../components/InputEntry";
// import {useAuth} from "../store/Auth"
// import {useNavigate} from "react-router-dom";
// import {toast} from "react-toastify";
// import LINK from "../store/Link";
// import Loader from "../components/Loader";
// import InputEntryPassword from "../components/InputEntryPassword"

// function Login() {
//     const navigate = useNavigate();
//     const currToken = localStorage.getItem("hackathon-token");
//     const [user,setUser] = useState({email: "", password: ""});
//     const {storeTokenInLS} = useAuth();

//     const [isLoading, setLoading] = useState(false);
    
//     React.useEffect(() => {
//         if (currToken) {
//             navigate("/home"); 
//         }
//     }, [currToken, navigate]);

//     function updateUser(event) {
//         const { name, value } = event.target;
//         setUser(prevUser => { 
//             const updatedUser = {
//                 ...prevUser,
//                 [name]: value,
//             }
//             return updatedUser;
//         });
//     }
    
//     async function storeData() {
//         setLoading(true);
//         const response = await fetch(LINK + "api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(user)
//         }); 
//         setLoading(false);
//         if (response.ok) {
//             toast("Successfully Logged in");
//             const resp_data = await response.json();
//             await storeTokenInLS(resp_data.token);
//             navigate("/home");
//         }
//         else {
//             const res_data = await response.json();
//             toast(res_data.extraDetails);
//         }
//     }
//     const serverMessage = "The Server Can Take Upto 90 Seconds Due To Inactivity";

//     return <> {isLoading ? <Loader /> :
//         <div className="w-full h-90vh flex flex-col justify-center items-center">
//             {(currToken == null) && (<>
//             <h1 className="mb-6 text-5xl text-center text-black">Welcome To Login Page</h1>
//             <InputEntry changeFunction={updateUser} name="email" text="Email" placeholder="Enter Your Email" />
//             <InputEntryPassword changeFunction={updateUser} name="password" text="Password" placeholder="Enter Your Password" />
//             <button className="customButton" type="submit" onClick={storeData}>Submit</button>

//             <h2 className="text-2xl mb-4 mt-8 text-black">Don't have an Account?</h2>
//             <button className="customButton" onClick={()=>navigate("/register")}>Register</button>
//             </>)}
//         </div>
//         }
//     </>
// }   

// export default Login;import React, { useState, useEffect } from "react";
import { useState,  useEffect } from "react";
import InputEntry from "../components/InputEntry";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LINK from "../store/Link";
import Loader from "../components/Loader";
import InputEntryPassword from "../components/InputEntryPassword";

function Login() {
    const navigate = useNavigate();
    const currToken = localStorage.getItem("hackathon-token");
    const [user, setUser] = useState({ email: "", password: "" });
    const { storeTokenInLS } = useAuth();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (currToken) {
            navigate("/home");
        }
    }, [currToken, navigate]);

    function updateUser(event) {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    async function storeData() {
        setLoading(true);
        try {
            const response = await fetch(LINK + "api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            setLoading(false);
            if (response.ok) {
                toast("Successfully Logged in");
                const resp_data = await response.json();
                await storeTokenInLS(resp_data.token);
                navigate("/home");
            } else {
                const res_data = await response.json();
                toast.error(res_data.extraDetails || "Login failed. Please try again.");
            }
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen pt-8">
                    {!currToken && (
                        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg">
                            <h1 className="mb-6 text-5xl text-center text-black">Login Page</h1>
                            <InputEntry
                                changeFunction={updateUser}
                                name="email"
                                text="Email"
                                placeholder="Enter Your Email"
                            />
                            <InputEntryPassword
                                changeFunction={updateUser}
                                name="password"
                                text="Password"
                                placeholder="Enter Your Password"
                            />

                            {/* Centering the submit button */}
                            <div className="flex justify-center">
                                <button
                                    className="customButton mt-8"
                                    type="submit"
                                    onClick={storeData}
                                >
                                    Submit
                                </button>
                            </div>

                            <h2 className="text-2xl mb-4 mt-8 text-black text-center">
                                Don't have an Account?
                            </h2>

                            {/* Centering the register button */}
                            <div className="flex justify-center">
                                <button
                                    className="customButton"
                                    onClick={() => navigate("/register")}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Login;
