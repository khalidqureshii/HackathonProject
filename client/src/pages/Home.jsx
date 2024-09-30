import React, { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDonateClick = (post) => {
    alert(`Donating for post: ${post.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        All Posts
      </h1>
      <div className="flex flex-col items-center w-5/6 p-10">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-lg shadow-md w-[60%] mb-8" 
          >
            <h2 className="text-2xl font-bold mb-4 text-black">{post.title}</h2>
            <p className="text-black mb-4">{post.description}</p>

              {post.imageUrl && (
                <img
                  src={`http://localhost:5000/${post.imageUrl}`}
                  alt={post.title}
                  className="w-full h-auto object-cover rounded-md mb-4" 
                />
              )}

            {post.isDonation && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-green-500 font-bold">Donation Post</p>
                <button
                  onClick={() => handleDonateClick(post)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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
  );
};

export default Home;