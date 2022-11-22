import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/authentication/signin.component";
import SignUp from "./components/authentication/signup.component";
import Dashboard from "./layout/dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login  />} />
        <Route path="/sign-in" element={<Login  />} />
        <Route path="/sign-up" element={<SignUp  />} />
        <Route path="/dashboard" element={<Dashboard  />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
