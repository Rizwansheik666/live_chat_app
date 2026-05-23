import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo2.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>talky app</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #fff8fb;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    background: linear-gradient(135deg, #f9f9f9, #ffe4f0);
    border-bottom: 1px solid #f5c6d8;
    box-shadow: 0 2px 8px rgba(255, 105, 150, 0.1);

    img {
      height: 2rem;
    }

    h3 {
      color: #c2185b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.1rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 1rem 0;
    background-color: #fff8fb;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #f48fb1;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff;
      border: 1px solid #f5c6d8;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;
      box-shadow: 0 1px 4px rgba(255, 105, 150, 0.08);

      &:hover {
        border-color: #e91e8c;
        box-shadow: 0 2px 10px rgba(233, 30, 140, 0.15);
        transform: scale(1.01);
      }

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          border: 2px solid #f48fb1;
          padding: 2px;
        }
      }

      .username {
        h3 {
          color: #4a4a4a;
          font-weight: 600;
        }
      }
    }

    .selected {
      background: linear-gradient(135deg, #f06292, #e91e8c);
      border-color: #e91e8c;
      box-shadow: 0 2px 12px rgba(233, 30, 140, 0.3);

      .username {
        h3 {
          color: #ffffff;
        }
      }

      .avatar {
        img {
          border-color: #ffffff;
        }
      }
    }
  }

  .current-user {
    background: linear-gradient(135deg, #ffe4f0, #ffc1d8);
    border-top: 1px solid #f5c6d8;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    box-shadow: 0 -2px 8px rgba(255, 105, 150, 0.1);

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 50%;
        border: 2px solid #e91e8c;
        padding: 2px;
      }
    }

    .username {
      h2 {
        color: #c2185b;
        font-weight: 700;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;