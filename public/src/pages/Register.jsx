import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo2.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
        //   JSON.stringify(data.user)
        // );
        // navigate("/");
        toast.success("Account created successfully! Please login.", toastOptions);
        navigate("/login");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>talky app</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}



const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(160deg, #fff0f5, #ffe4f0, #ffc1d8);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
      filter: drop-shadow(0 4px 10px rgba(233, 30, 140, 0.25));
    }

    h1 {
      color: #c2185b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.1rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 0 8px 32px rgba(233, 30, 140, 0.15);
    border: 1px solid #f5c6d8;
  }

  input {
    background-color: #fff8fb;
    padding: 1rem;
    border: 0.1rem solid #f5c6d8;
    border-radius: 0.4rem;
    color: #4a4a4a;
    width: 100%;
    font-size: 1rem;
    transition: border 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: #f48fb1;
    }

    &:focus {
      border: 0.1rem solid #e91e8c;
      box-shadow: 0 0 8px rgba(233, 30, 140, 0.2);
      outline: none;
    }
  }

  button {
    background: linear-gradient(135deg, #f06292, #e91e8c);
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 2rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    box-shadow: 0 4px 12px rgba(233, 30, 140, 0.3);
    transition: opacity 0.2s ease, transform 0.2s ease;

    &:hover {
      opacity: 0.85;
      transform: scale(1.03);
    }

    &:active {
      transform: scale(0.97);
    }
  }

  span {
    color: #888888;
    text-transform: uppercase;
    font-size: 0.9rem;

    a {
      color: #e91e8c;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.2s ease;

      &:hover {
        color: #c2185b;
      }
    }
  }
`;