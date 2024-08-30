import React, { useState } from "react";
import "../style/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!input.email.trim()) {
      isValid = false;
      errors.email = "Email is required";
    }
    if (!input.password.trim()) {
      isValid = false;
      errors.password = "Password is required";
    }

    setErrors(errors);
    return isValid;
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
      if (validate()) {
        const response = await axios.post(
          "https://quizz-server-o2rw.onrender.com/login",
          {
            email: input.email,
            password: input.password,
          }
        );
        if (response.data.message === "success") {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } else {
          toast.error(response.data.message);
        }
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
                  <label className="signup-label">Email</label>
                  <input
                    className="signup-input"
                    type="text"
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
                    type="text"
                    placeholder={errors.password}
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                  />
                </div>

                <button className="signup-btn">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
