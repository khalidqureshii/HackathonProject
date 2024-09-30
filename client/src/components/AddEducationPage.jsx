import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import Loader from "./Loader";
import useAuth from "../store/Auth";
// Ensure this import is correct

const AddEducationPage = ({ setEducation, education, setOpen }) => {
  const institutionRef = useRef();
  const courseRef = useRef();
  const startYearRef = useRef();
  const endYearRef = useRef();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const appendEducation = async (e) => {
    e.preventDefault();

    const newEducation = {
      university: institutionRef.current.value,
      course: courseRef.current.value,
      startYear: startYearRef.current.value,
      endYear: endYearRef.current.value,
    };

    setLoading(true);
    setErrorMessage(""); // Reset error message
    console.log("JHAkan-> " + token);
    try {
      const response = await fetch(
        "http://localhost:5000/api/profile/education/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEducation),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add education");
      }

      const result = await response.json();
      // console.log("result->" + result.msg);
      // const result = await response.json();
      setEducation(result.education);

      institutionRef.current.value = "";
      courseRef.current.value = "";
      startYearRef.current.value = "";
      endYearRef.current.value = "";
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.message); // Set the error message state
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] bg-white p-5 shadow-lg rounded">
      <div className="flex flex-row justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Edit Education</h2>
        <a
          onClick={() => setOpen(false)}
          className="hover:opacity-50 cursor-pointer"
        >
          <CgClose size={30} />
        </a>
      </div>
      <div className="h-px bg-gray-300 mt-3"></div>
      <form className="flex flex-col gap-2" onSubmit={appendEducation}>
        <label
          htmlFor="university"
          className="block text-sm font-medium text-gray-700"
        >
          University Name
        </label>
        <input
          id="university"
          type="text"
          placeholder="Enter University Name"
          ref={institutionRef}
          className="p-2 border border-gray-300 rounded-md ring-[1px] ring-gray-300 focus:outline-none focus:ring-gray-500 transition duration-150 ease-in-out"
          required
        />
        <label
          htmlFor="inputField"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Course
        </label>
        <input
          id="inputField"
          type="text"
          placeholder="Enter here"
          ref={courseRef}
          className="p-2 border border-gray-300 rounded-md ring-[1px] ring-gray-300 focus:outline-none focus:ring-[1px] focus:ring-gray-500 transition duration-150 ease-in-out"
        />
        <label
          htmlFor="startYear"
          className="block text-sm font-medium text-gray-700"
        >
          Started in
        </label>
        <select
          id="startYear"
          ref={startYearRef}
          className="border p-2 rounded outline-none ring-[1px] ring-gray-200 focus:ring-gray-700 transition 1s"
          required
        >
          <option value="" disabled>
            Select Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label
          htmlFor="endYear"
          className="block text-sm font-medium text-gray-700"
        >
          Completed in
        </label>
        <select
          id="endYear"
          ref={endYearRef}
          className="border p-2 rounded outline-none ring-[1px] ring-gray-200 focus:ring-gray-700 transition 1s"
          required
        >
          <option value="" disabled>
            Select Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 rounded mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Education"}
        </button>
      </form>

      {/* Display Loader */}
      {loading && <Loader />}

      {/* Display Error Message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default AddEducationPage;
