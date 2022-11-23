import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignIn from "./components/authentication/signin.component";
import SignUp from "./components/authentication/signup.component";
import Dashboard from "./layout/dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import WelcomeScreen from "./layout/screens/welcomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/welcome-screen" element={<WelcomeScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
