import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import PreHome from "./pages/PreHome";
import Header from "./components/Header";
import DummyHeader from "./components/DummyHeader";
import Connect from "./pages/Connect";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <PreHome />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <DummyHeader />
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <DummyHeader />
                <Register />
              </>
            }
          />
          <Route
            path="/logout"
            element={
              <>
                <Header />
                <Logout />
              </>
            }
          />
          <Route
            path="/homepage"
            element={
              <>
                <Header />
                <HomePage />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile />
              </>
            }
          />

          <Route
            path="/connect"
            element={
              <>
                <Header />
                <Connect />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
