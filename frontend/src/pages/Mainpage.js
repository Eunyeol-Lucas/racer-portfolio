import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import authHeader from "../modules/authHeader";
import tokenCheck from "../modules/authToken";
import styled from "styled-components";

// Racer 정보 및 수정 업로드 기능 page
export default function Mainpage() {
  const [file, setFile] = useState({ file: null });
  const [username, setUsername] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [introduction, setIntroduction] = useState("");
  //token 확인 및 유저 프로필 정보 요청

  useEffect(() => {
    const request_profile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/profile`,
          { headers: authHeader() }
        );
        console.log(response.data);
        setFile({
          file: `${process.env.REACT_APP_BASE_URL}/${response.data.profile_image}`,
        });
        setUsername(response.data.username);
        setSelfIntroduction(response.data.introduction);
      } catch (err) {
        console.log(err.response);
      }
    };
    request_profile();
  }, []);

  const onhandlerChange = async (event) => {
    const imageFile = Array.from(event.target.files);
    const formData = new FormData();
    formData.append("file", imageFile[0]);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/profile`,
        formData,
        { headers: authHeader() }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
    setFile({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  return (
    <div>
      <div>
        <p>{selfIntroduction}</p>
      </div>
      <div>
        <p>
          <label className="input-file-button" for="input-file">
            <Img src={file.file} alt="#" />
          </label>
          <input
            id="input-file"
            type="file"
            accept="image/*"
            onChange={onhandlerChange}
            style={{ display: "none" }}
          />
        </p>
        <p>{username}</p>
        <form>
          <p>
            <label className="intro-button" for="intro">
              <p>{selfIntroduction}</p>
            </label>
            <input
              id="intro"
              type="text"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="아무말 대잔치"
              defaultValue={selfIntroduction}
            />
          </p>

          <p>
            <button type="submit">SEND</button>
          </p>
        </form>
        <TextInput />
      </div>
    </div>
  );
}

export function TextInput() {
  const ref = useRef(null);
  const [text, setText] = useState("");
  const [editable, setEditable] = useState(false);
  const editOn = () => {
    setEditable(true);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditable(!editable);
    }
  };
  const handleClickOutside = (e) => {
    if (editable === true && !ref.current.contains(e.target))
      setEditable(false);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside, true);
  });
  return (
    <>
      <div ref={ref}>
        {editable ? (
          <input
            type="text"
            value={text}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div onClick={() => editOn()}>{text}</div>
        )}
      </div>
    </>
  );
}

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: red;
`;

// const ImgInput = styled.input`
//   background: ${(props) => }
// `
