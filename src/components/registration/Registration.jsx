import React, { useState } from "react";
import "./registration.css"
import register from "../../services/authService";
import Logo from '../../assets/logo2.png'
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Submitting registration data:", formData); // Add this line
      await register(formData);
      console.log("User registered successfully!");
      navigate("/")
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };
  
  return (
    <div className="login">
      <div className="log">
        <Link to="/">
        <img src={Logo} alt="" className="logo_img2" />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="lContainer">
      <span className="lLogin">Register</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="lInput"
              placeholder="username"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="lInput"
              placeholder="e-mail"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="lInput"
              placeholder="password"
            />
          <button className="lButton2" type="submit">Register</button>
      </div>
      </form>
    </div>
  );
};

export default Registration;
