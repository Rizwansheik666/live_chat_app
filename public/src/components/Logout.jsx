import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}



const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #f06292, #e91e8c);
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(233, 30, 140, 0.25);
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }

  svg {
    font-size: 1.3rem;
    color: #ffffff;
  }
`;