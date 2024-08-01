// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import MainComponent from "./components/MainComponent";
import ProtectedRoute from "./components/ProtectedRoute";

import "./styles.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/classify"
          element={
            <ProtectedRoute>
              <MainComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/:id"
          element={
            <ProtectedRoute>
              <MainComponent />
            </ProtectedRoute>
          }
        />
      </Routes>

    </Router>
  );
};

export default App;
