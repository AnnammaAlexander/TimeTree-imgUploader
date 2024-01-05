// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import SignupPage from "./pages/user/SignupPage";
import AdminLoginPage from "./pages/admin/adminLoginPage";
import AdminDashbord from "./pages/admin/AdminDashbord";
import AdminUserList from "./pages/admin/AdminUserList";
import { useSelector } from "react-redux";
import UserHome from "./pages/user/UserHome";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import UserProfile from "./pages/user/UserProfile";
import ProjectUser from "./pages/user/ProjectUser";
import SingleProject from "./pages/user/SingleProject";

function App() {
  const reduxToken = useSelector((store) => store.user.token);
  const adminToken = useSelector((store) => store.admin.adminToken);
  console.log("adminToken......", adminToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={reduxToken ? <UserHome /> : <UserLogin />}
        ></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/projects" element={<ProjectUser />}></Route>
        <Route path="/singleProject" element={<SingleProject />}></Route>

        <Route
          path="/admin"
          element={adminToken ? <AdminDashbord /> : <AdminLoginPage />}
        ></Route>
        <Route path="/imgupload/:id" element={<AdminUserList />}></Route>
        <Route path="/userlist" element={<AdminUserDetails />}></Route>
        <Route path="/adminprofile" element={<AdminProfilePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
