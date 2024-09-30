import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
const AddExperiencePage = ({ setExperience, experience, setOpen }) => {
  const companyRef = useRef();
  const roleRef = useRef();
  const typeRef = useRef();
  const startYearRef = useRef();
  const endYearRef = useRef();

  const appendExperience = (e) => {
    e.preventDefault();

    const newExperience = {
      company: companyRef.current.value,
      course: roleRef.current.value,
      type: typeRef.current.value,
      startYear: startYearRef.current.value,
      endYear: endYearRef.current.value,
    };

    console.log(newExperience);

    setExperience([...experience, newExperience]);
    companyRef.current.value = "";
    roleRef.current.value = "";
    typeRef.current.value = "";
    startYearRef.current.value = "";
    endYearRef.current.value = "";
    setOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] bg-white p-5 shadow-lg rounded">
        <div className="flex flex-row justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Experience
          </h2>
          <a
            onClick={() => {
              setOpen(false);
            }}
            className="hover:opacity-50 cursor-pointer"
          >
            <CgClose size={30} />
          </a>
        </div>
        <div className="h-px bg-gray-300 mt-3"></div>
        <form className="flex flex-col gap-2" onSubmit={appendExperience}>
          <label
            htmlFor="Company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            id="Company"
            type="text"
            placeholder="Enter Company Name"
            ref={companyRef}
            className="p-2 border border-gray-300 rounded-md ring-[1px] ring-gray-300 focus:outline-none focus:ring-gray-500 transition duration-150 ease-in-out"
            required
          />
          <label
            htmlFor="inputField"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <input
            id="inputField"
            type="text"
            placeholder="Enter here"
            ref={roleRef}
            className="p-2 border border-gray-300 rounded-md ring-[1px] ring-gray-300 focus:outline-none focus:ring-[1px] focus:ring-gray-500 transition duration-150 ease-in-out"
          />

          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Type
          </label>
          <select
            id="jobType"
            className="border p-2 rounded outline-none ring-[1px] ring-gray-200 focus:ring-gray-700 transition 1s"
            ref={typeRef}
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>

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
            <option value="">Present</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded mt-4"
            onClick={appendExperience}
          >
            Add Experience
          </button>
        </form>
      </div>
    </>
  );
};

export default AddExperiencePage;
