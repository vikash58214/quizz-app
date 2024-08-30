import React, { useState } from "react";
import "../style/signup.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const isValid = () => {
    let errors = {};
    let valid = true;
    if (!input.name.trim()) {
      valid = false;
      errors.name = "Name is required";
    }
    if (!input.email.trim()) {
      valid = false;
      errors.email = "Email is required";
    }
    if (!input.password.trim()) {
      valid = false;
      errors.password = "Password is required";
    }
    if (!input.confirmPassword.trim()) {
      valid = false;
      errors.confirmPassword = "Confirm password required";
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isValid() && input.password === input.confirmPassword) {
        await axios.post("https://quizz-server-o2rw.onrender.com/signup", {
          name: input.name,
          email: input.email,
          password: input.password,
        });
        window.alert("Registration success");
        navigate("/login");
      }
      if (
        input.password.trim() &&
        input.confirmPassword.trim() &&
        input.password !== input.confirmPassword
      ) {
        return toast.error("Confirm password not match");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="signup-body">
        <div className="signup-subBody">
          <div className="signup-formBody">
            <div style={{ marginTop: "50px" }}>
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  color: "#474444",
                }}
              >
                QUIZZIE
              </h1>
            </div>
            <div className="signup-switch-body">
              <Link className="login-switch" to="/signup">
                Sign Up
              </Link>
              <Link className="login-switch" to="/login">
                Login
              </Link>
            </div>
            <div className="signup-form-body">
              <form onSubmit={handleSubmit}>
                <div className="register-input-body">
                  <label className="signup-label">Name</label>
                  <input
                    className="signup-input"
                    type="text"
                    placeholder={errors.name}
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-input-body">
                  <label className="signup-label">Email</label>
                  <input
                    className="signup-input"
                    type="email"
                    placeholder={errors.email}
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-input-body">
                  <label className="signup-label">Password</label>
                  <input
                    className="signup-input"
                    type="password"
                    placeholder={errors.password}
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-input-body">
                  <label className="signup-label">Confirm Password</label>
                  <input
                    className="signup-input"
                    type="password"
                    placeholder={errors.confirmPassword}
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <button className="signup-btn">Sign-Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
