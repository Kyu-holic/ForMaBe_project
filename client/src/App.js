import React from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/OldRegister.jsx(예전화면)";
import SinglePost from "./pages/singlePost/SinglePost";
import Write from "./pages/write/Write";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/reset.css";
import { useSelector } from "react-redux";
import Edit from "./pages/write/Edit";
import NewRegister from "./pages/register/Register";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer />
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <NewRegister />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/write/:id" element={user ? <Edit /> : <Register />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
