import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}



const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #fff0f5;
  padding: 0.5rem 2rem;
  border-top: 1px solid #f5c6d8;
  min-height: 60px;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: #e91e8c;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #e91e8c;
        cursor: pointer;
        transition: color 0.2s ease;

        &:hover {
          color: #c2185b;
        }
      }

      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #ffffff;
        box-shadow: 0 5px 20px rgba(233, 30, 140, 0.2);
        border-color: #f5c6d8;
        border-radius: 1rem;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #fff0f5;
          width: 5px;
          &-thumb {
            background-color: #f48fb1;
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0.8);
          }
        }

        .emoji-search {
          background-color: #fff8fb;
          border-color: #f5c6d8;
          border-radius: 1rem;
          color: #c2185b;
        }

        .emoji-group:before {
          background-color: #fff0f5;
          color: #e91e8c;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff;
    border: 1.5px solid #f5c6d8;
    box-shadow: 0 2px 8px rgba(255, 105, 150, 0.1);
    padding: 0.3rem 0.5rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus-within {
      border-color: #e91e8c;
      box-shadow: 0 2px 12px rgba(233, 30, 140, 0.2);
    }

    input {
      width: 90%;
      background-color: transparent;
      color: #4a4a4a;
      border: none;
      padding: 0.8rem 1rem;
      font-size: 1rem;
      font-family: "Josefin Sans", sans-serif;

      &::placeholder {
        color: #f48fb1;
      }

      &::selection {
        background-color: #f8bbd0;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.5rem 1.5rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #f06292, #e91e8c);
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease, transform 0.2s ease;

      &:hover {
        opacity: 0.85;
        transform: scale(1.03);
      }

      &:active {
        transform: scale(0.97);
      }

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 1.8rem;
        color: white;
      }
    }
  }
`;