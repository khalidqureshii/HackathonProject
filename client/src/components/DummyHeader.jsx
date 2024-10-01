// import react from "react";

// function DummyHeader () {
//     return <header className="flex flex-row justify-center md:justify-start bg-[#2d2d2d] py-4">
//         <button onClick={()=>{}}><h1 className="text-3xl md:ml-7">Alumni</h1></button>
//     </header>
// }

// export default DummyHeader;
import React from "react";
import ProfileMenu from "./ProfileMenu"; // Import the ProfileMenu component

const Header = () => {
  return (
    <header className="relative flex flex-row justify-between items-center bg-gradient-to-r from-blue-300 to-blue-500 py-4 shadow-lg">
      {/* Logo/Title (Aligned to the left) */}
      <div className="flex items-center ml-5 md:ml-7">
        <img
          src="chain_15771971.png.jpg" // Replace with the actual path to your PNG
          alt="Logo"
          className="w-9 h-9 mr-3 shadow-xl rounded-full" // Adjust size and margin as needed
        />
        <h1 className="text-white text-2xl font-cambria font-bold md:text-3xl">ConnectUS</h1>
      </div>

      {/* Icons Section (Aligned to the right) */}
      <div className="flex items-center space-x-4 mr-5 md:mr-7">
        <div className="text-white text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-9 h-9 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>

        {/* Home Button (Left of the bell icon) */}
        <div className="text-white text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-9 h-9 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>

        <div className="text-white text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-9 h-9 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>
        </div>

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
