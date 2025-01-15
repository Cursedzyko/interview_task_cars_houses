import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
import ManageUsers from "./pages/ManageUsers";
import CarsPage from "./pages/CarsPage";
import HousesPage from "./pages/HousesPage";
import Signup from "./pages/Singup";
import RegularUserPanel from "./pages/RegularUserPanel";
import { Navigate } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />



        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={token ? <AdminPanel /> : <Navigate to="/" />}
        />
        
        <Route path="/cars" element={token ? <CarsPage /> : <Navigate to="/"/>} />

        <Route path="/houses" element={token ? <HousesPage /> : <Navigate to="/"/>} />

        <Route path="/manage-users" 
          element={token ? <ManageUsers /> : <Navigate to="/" />}
        />

        <Route
          path="/regular-user"
          element={token ? <RegularUserPanel /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
