import React, { useState, useCallback } from "react";
import axios from "axios";
//회원가입 page
const RegisterPage = (props) => {
  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState(true);
  const [idValidate, setIdValidate] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordVali, setPasswordVali] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameCheck, setUsernameCheck] = useState(true);

  const { history } = props;
  // Custom Hook 이전
  // 두 비밀번호가 일치하는지 확인
  const onChangePasswordChk = useCallback(
    (e) => {
      //비밀번호를 입력할때마다 password 를 검증하는 함수
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [passwordCheck]
  );
  // 아이디 중복 검사
  const onChangeId = (e) => {
    setId(e.target.value);
    const checkEmail = (value) => {
      const regExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      return regExp.test(value);
    };
    !checkEmail(e.target.value) ? setIdCheck(false) : setIdCheck(true);
  };
  // 패스워드 유효성 검사
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const checkPassword = (value) => {
      const regExp = /^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return regExp.test(value);
    };
    !checkPassword(e.target.value)
      ? setPasswordVali(false)
      : setPasswordVali(true);
  };
  // 이름 유효성 검사
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    const checkUsername = (value) => {
      const regExp = /^[a-zA-Z가-힣]*$/;
      return regExp.test(value);
    };
    !checkUsername(e.target.value)
      ? setUsernameCheck(false)
      : setUsernameCheck(true);
  };
  // 회원가입 버튼 누를 경우, 최종 확인
  const onSubmit = (e) => {
    e.preventDefault();
    /**검증 로직 만들기
     1. 아이디가 이메일이 아닐 경우 return
     2. 비밀번호와 비밀번호 체크가 다를 경우 return
     3. 사용자 이름이 기준에 맞지 않을 경우 return
     4. 모든 유효성 검사를 통과할 경우 서버에 data 저장 요청
     5. 중복된 아이디가 있을 경우 -> fail -> 아이디 유효성 검사 실패 -> return
     6. 최종적으로 모든 유효성 검사를 통과할 경우 데이터 저장 -> 회원가입 완료
     7. 회원가입 완료 후 로그인 page로 이동
     */
    if (!idCheck) return;

    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!usernameCheck) return;

    const body = {
      username,
      id,
      password,
    };
    console.log(body);
    axios
      .post(`http://localhost:5000/register`, body)
      .then((res) => {
        console.log(res);
        if (res.data.result === "fail") {
          setIdValidate(false)
        } else
          {alert("회원 가입에 성공하셨습니다.");
        history.push('/login');}
      })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            name="id"
            value={id}
            required
            onChange={onChangeId}
            placeholder="abc@email.com"
          />
          {!idCheck && (
            <div style={{ color: "red" }}>ID 형식이 유효하지 않습니다.</div>
          )}
          {!idValidate && (
            <div style={{ color: "red" }}>중복된 아이디가 존재합니다.</div>
          )}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
          {!passwordVali && (
            <div style={{ color: "red" }}>
              영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상
            </div>
          )}
        </div>
        <div>
          <label htmlFor="password-check">비밀번호 확인</label>
          <input
            name="password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordChk}
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <label htmlFor="username">이름</label>
          <input
            name="username"
            value={username}
            required
            onChange={onChangeUsername}
          />
          {!usernameCheck && (
            <div style={{ color: "red" }}>
              한글 또는 영문으로만 입력이 가능합니다.
            </div>
          )}
        </div>
        <div>
          <p>
            <button type="submit">가입하기</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
