import React, { useState } from "react";
import "./Login.css";
const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="Login">
      <h1 className="Login-title">
        Rapptr <span className="primary-color">Labs</span>
      </h1>
      <form>
        <div className="form-field">
          <label for="email">Email</label>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder=" user@rapptrlabs.com"
            />
          </div>
        </div>
        <div className="form-field">
          <label for="password">Password</label>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Must be at least 4 characters"
            />
          </div>
        </div>
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
