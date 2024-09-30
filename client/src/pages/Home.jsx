// import React from 'react'

// const Home = () => {
//   return (
//     <div className="w-full h-90vh flex justify-center items-center"><h1 className='text-5xl'>Welcome To Home Page</h1></div>
//   )
// }

// export default Home

import React, { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/posts/dispPosts"
        );
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

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        All Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="border-2 border-black flex items-center justify-between p-4">
              <h2 className="text-2xl font-bold text-black">{post.title}</h2>
              <button className="border-4 border-black px-4 py-2 bg-white text-black hover:bg-gray-200 rounded">
                Chat
              </button>
            </div>
            <p className="text-black mb-4">{post.description}</p>
            {post.imageUrl && (
              <img
                src={`http://localhost:5000/${post.imageUrl}`}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            {post.isDonation && (
              <p className="text-green-500 font-bold">Donation Post</p>
            )}
            <p className="text-gray-500 text-sm">
              Created at: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
