import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
const AddEducationPage = ({ setEducation, education, setOpen }) => {
  const institutionRef = useRef();
  const courseRef = useRef();
  const startYearRef = useRef();
  const endYearRef = useRef();

  const appendEducation = (e) => {
    e.preventDefault();

    const newEducation = {
      institution: institutionRef.current.value,
      course: courseRef.current.value,
      startYear: startYearRef.current.value,
      endYear: endYearRef.current.value,
    };

    console.log(newEducation);
    setEducation([...education, newEducation]);

    institutionRef.current.value = "";
    courseRef.current.value = "";
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
            Edit Education
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
            className="bg-blue-500 text-white py-2 rounded mt-4"
            onClick={appendEducation}
          >
            Add Education
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEducationPage;
