import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(160deg, #fff8fb, #ffe4f0);
  color: #4a4a4a;

  img {
    height: 20rem;
    filter: drop-shadow(0 4px 16px rgba(233, 30, 140, 0.2));
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.03);
    }
  }

  h1 {
    color: #c2185b;
    font-weight: 700;
    font-size: 1.8rem;
    letter-spacing: 0.05rem;
  }

  p {
    color: #888888;
    font-size: 1rem;
  }

  span {
    color: #e91e8c;
    font-weight: 700;
  }
`;
