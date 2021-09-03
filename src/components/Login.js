import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Login.css";
const url = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";
const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false,
    server: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
    server: "",
  });
  const [loading, setLoading] = useState(false);
  const validationCheck = useCallback(() => {
    // email validation
    if (formData.email !== "") {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          formData.email
        )
      ) {
        setFormError((prev) => ({ ...prev, email: false }));
        setErrorMsg((prev) => ({ ...prev, email: "" }));
      } else {
        setFormError((prev) => ({ ...prev, email: true }));
        setErrorMsg((prev) => ({
          ...prev,
          email: "Must Be A Valid Email",
        }));
      }
    }

    //password validation
    if (formData.password !== "") {
      if (formData.password.length < 4) {
        setFormError((prev) => ({ ...prev, password: true }));
        setErrorMsg((prev) => ({
          ...prev,
          password: "Password Must Be Greater Than 4 Characters",
        }));
      } else if (formData.password.length > 16) {
        setFormError((prev) => ({ ...prev, password: true }));
        setErrorMsg((prev) => ({
          ...prev,
          password: "Password Must Be Fewer Than 16 Characters",
        }));
      } else {
        setFormError((prev) => ({ ...prev, password: false }));
        setErrorMsg((prev) => ({ ...prev, password: "" }));
      }
    }
  }, [formData]);
  useEffect(() => {
    validationCheck();
  }, [validationCheck]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // check for errors
      if (formError.email === false && formError.password === false) {
        setLoading(true);
        const { email, password } = formData;
        let form = new FormData();
        form.append("email", email);
        form.append("password", password);
        const { data } = await axios.post(url, form, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        });
        if (data) {
          setFormError({ ...formError, server: false });
          setErrorMsg({ ...formError, server: "Unable To Reach Server" });
          localStorage.setItem("user", data.user_id);
          props.setUser(localStorage.getItem("user"));
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setFormError({ ...formError, server: true });
      setErrorMsg({ ...formError, server: "Unable To Reach Server" });
    }
  };
  return (
    <div className="Login container">
      <h1 className="Login-title">
        Rapptr <span className="primary-color">Labs</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <div
            className={`input-field ${formError.email ? "invalid-form" : ""}`}
          >
            <i className="fas fa-user"></i>
            <input
              type="email"
              name="email"
              required={true}
              autoComplete="off"
              maxLength={50}
              value={formData.email}
              onChange={handleChange}
              placeholder=" user@rapptrlabs.com"
            />
          </div>
          {formError.email && errorMsg.email.length > 0 && (
            <span className="err-msg">{errorMsg.email}</span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div
            className={`input-field ${
              formError.password ? "invalid-form" : ""
            }`}
          >
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              required={true}
              minLength={4}
              maxLength={16}
              value={formData.password}
              onChange={handleChange}
              placeholder="Must be at least 4 characters"
            />
          </div>
          {formError.password && errorMsg.password.length > 0 && (
            <span className="err-msg">{errorMsg.password}</span>
          )}
        </div>
        <button
          disabled={formError.email || formError.password || loading}
          className={`btn ${
            formError.email || formError.password ? "btn-disabled" : ""
          }`}
        >
          Login
        </button>
        {formError.server && errorMsg.server.length > 0 && (
          <span className="err-msg">{errorMsg.server}</span>
        )}
      </form>
    </div>
  );
};

export default Login;
