import React, { useState } from "react";
import "./index.css"; // CSS dosyasını import ediyoruz
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../../../constant/base";

const Login = () => {
  const [register_name, setRegName] = useState();
  const [register_email, setRegEmail] = useState();
  const [register_password, setRegPassword] = useState();
  const [log_email, setLogEmail] = useState();
  const [log_password, setLogPassword] = useState();

  const navigate = useNavigate();

  // Register işlemi
  const handleChangeReg = async (e) => {
    e.preventDefault();
    try {
      const regUser = await axios.post(`${Base_Url}/api/register`, {
        name: register_name, 
        email: register_email,
        password: register_password,
      });
      console.log(regUser); // Server'dan gelen cevabı kontrol edin
    } catch (error) {
      console.log("Register Error: ", error); // Hata varsa kontrol edin
    }
  };

  // Login işlemi
  const handleChangeLog = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(`${Base_Url}/api/login`, {
        email: log_email,
        password:log_password,
      });
      console.log(user); // Server'dan gelen cevabı kontrol edin
      if (user.status === 200) {
        navigate("/home"); 
      }
    } catch (error) {
      console.log("Login Error: ", error); // Hata varsa kontrol edin
    }
  };

  return (
    <>
      <div className="login-container">
        <input type="checkbox" id="login-checkbox" aria-hidden="true" />
        <div className="signup-section">
          <form onSubmit={handleChangeReg}>
            <label htmlFor="login-checkbox" aria-hidden="true">
              Sign up
            </label>
            <input
              className="signup-input"
              type="text"
              name="txt"
              placeholder="User name"
              required=""
              onChange={(e) => setRegName(e.target.value)}
            />
            <input
              className="signup-input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input
              className="signup-input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <button className="signup-button" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <div className="login-section">
          <form onSubmit={handleChangeLog}>
            <label htmlFor="login-checkbox" aria-hidden="true">
              Login
            </label>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) => setLogEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              onChange={(e) => setLogPassword(e.target.value)}
            />
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
