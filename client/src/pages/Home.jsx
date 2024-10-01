// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import 'tailwindcss/tailwind.css'; // Ensure you have Tailwind CSS imported
// import '../App.css';

// const Home = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/posts/dispPosts");
//         const data = await response.json();
//         setPosts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleDonateClick = (post) => {
//     alert(`Donating for post: ${post.title}`);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault(); // Prevent the default form submission
//     // You can implement the search functionality here
//     alert(`Searching for: ${searchTerm}`);
//   };

//   const handleCreatePostClick = () => {
//     alert("Redirecting to create a new post...");
//     // You can add logic to navigate to the create post page here
//   };

//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   return (
//     <div className="bg-custom min-h-screen bg-gray-100 flex flex-col">
//       {/* Create Post Button */}
//       <div className="flex justify-center mb-4">
//         <button
//           // onClick={handleCreatePostClick}
//           onClick={() => navigate("/homepage")}
//           className="bg-customBlue hover:bg-blue-500 mt-5 text-white text-xl py-2 px-4 rounded w-[46%] h-12 transition duration-200 shadow-xl bg-white border-blue-600"
//         >
//           Create Post
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="mt-0 flex flex-col items-center">
//         <div className="flex flex-col items-center w-5/6">
//           {posts.map((post) => (
//             <div key={post._id} className="bg-white p-8 rounded-lg shadow-lg w-[55%] mb-3 transition-transform transform hover:scale-105">
//               <h2 className="text-3xl font-semibold mb-4 text-gray-800">{post.title}</h2>
//               <p className="text-gray-700 mb-4">{post.description}</p>
//               {post.imageUrl && (
//                 <img
//                   src={`http://localhost:5000/${post.imageUrl}`}
//                   alt={post.title}
//                   className="w-full h-auto max-h-[400px] object-cover rounded-md mb-4"
//                 />
//               )}
//               {post.isDonation && (
//                 <div className="flex justify-between items-center mt-4">
//                   <p className="text-green-500 font-bold">Donation Post</p>
//                   <button
//                     onClick={() => handleDonateClick(post)}
//                     className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//                   >
//                     Donate
//                   </button>
//                 </div>
//               )}
//               <p className="text-gray-500 text-sm">
//                 Created at: {new Date(post.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css'; // Ensure you have Tailwind CSS imported
import '../App.css';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts/dispPosts");
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDonateClick = (post) => {
    // alert(`Donating for post: ${post.title}`);
    navigate("/donation");
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // You can implement the search functionality here
    alert(`Searching for: ${searchTerm}`);
  };

  const handleCreatePostClick = () => {
    alert("Redirecting to create a new post...");
    // You can add logic to navigate to the create post page here
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="bg-custom min-h-screen bg-gray-100 flex flex-col">
      {/* Create Post Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => navigate("/homepage")}
          className="bg-customBlue hover:bg-blue-500 mt-5 text-white text-xl py-2 px-4 rounded w-[46%] h-12 transition duration-200 shadow-xl border border-blue-600"
        >
          Create Post
        </button>
      </div>

      {/* Main Content */}
      <div className="mt-0 flex flex-col items-center">
        <div className="flex flex-col items-center w-5/6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-8 rounded-lg shadow-lg w-[55%] mb-3 transition-transform transform hover:scale-105">
              {/* User Information */}
              <div className="flex items-center mb-4">
                <img
                  src="src/images/Aishani_photo.jpeg" // Ensure this property exists in your post data
                  alt={`${post.username}'s profile`}
                  className="w-10 h-10 rounded-full mr-3" // Styling for profile picture
                />
                <a href = "/homepage" className="text-gray-600 text-lg font-semibold">aishanichauhan23</a>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.description}</p>
              {post.imageUrl && (
                <img
                  src={`http://localhost:5000/${post.imageUrl}`}
                  alt={post.title}
                  className="w-full h-auto max-h-[400px] object-cover rounded-md mb-4"
                />
              )}
              {post.isDonation && (
                <div className="flex justify-between items-center mt-4">
                  <p className="text-green-500 font-bold">Donation Post</p>
                  <button
                    onClick={() => handleDonateClick(post)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Donate
                  </button>
                </div>
              )}
              <p className="text-gray-500 text-sm">
                Created at: {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


