import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import multiavatar from "@multiavatar/multiavatar/esm";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (!user) navigate("/login");
  }, [navigate]);

  const generateRandomName = () => Math.random().toString(36).substring(2, 10);

  useEffect(() => {
    const generateAvatars = () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomName = generateRandomName();
        const svgCode = multiavatar(randomName);
        const encoded = btoa(unescape(encodeURIComponent(svgCode)));
        data.push(encoded);
      }
      setAvatars(data);
      setIsLoading(false);
    };

    generateAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(user)
      );
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: linear-gradient(160deg, #fff0f5, #ffe4f0, #ffc1d8);
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: #c2185b;
      font-weight: 700;
      letter-spacing: 0.05rem;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(255, 105, 150, 0.15);

      img {
        height: 6rem;
        transition: 0.3s ease-in-out;
        border-radius: 50%;
      }

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(233, 30, 140, 0.25);
      }
    }

    .selected {
      border: 0.4rem solid #e91e8c;
      box-shadow: 0 4px 16px rgba(233, 30, 140, 0.35);
    }
  }

  .submit-btn {
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
`;