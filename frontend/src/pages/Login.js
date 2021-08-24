import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Login Page
const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === "" || password === "") {
      alert("아이디 또는 비밀번호를 입력해주세요")
      return;
    };
    if (!userId && !password) return;
    const body = {
      userId,
      password,
    };
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`, body).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("access_token", res.data);
        localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
        history.push("/mainmain");
        alert("로그인에 성공하였습니다.");
      }
    }).catch((e => {
      console.log(e.response);
      alert("아이디 또는 비밀번호를 확인하세요");
    }))
  };

  return (
    <div>
      {window.localStorage.getItem("access_token") ? (
        <div>환영합니다.</div>
      ) : (
        <form form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userId"></label>
            아이디
            <input
              placeholder="ID를 입력하세요"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호 </label>
            <input
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">로그인</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
