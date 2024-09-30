import React from "react";
import CreatePost from "../components/CreatePost.jsx";
import '../App.css';

function HomePage() {
  return (
    <div className="App min-h-screen flex flex-col bg-custom">
      <CreatePost />
    </div>
  );
}

export default HomePage;
