import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { AuthProvider } from "./auth/auth";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </div>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
