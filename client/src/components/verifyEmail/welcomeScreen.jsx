import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./welcomeScreen.css";

function WelcomeScreen() {
  return (
    <>
      <div className="welcomeScreen__container">
        <h1>Check Your Email!</h1>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Got the email?
          <span style={{ width: "10px" }}></span>
          <Link className="nav-link" to={"/sign-in"} style={{ color: "blue" }}>
            <Button className="mui-btn mui-btn--raised">Login</Button>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default WelcomeScreen;
