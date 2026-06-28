import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddTask from "../pages/AddTask";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default AppRoutes;