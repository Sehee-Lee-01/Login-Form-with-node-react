import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // email, passwors state 만들기(리액트 훅)
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    // page refresh 방지
    event.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body))
      .then((response) => {
        if (response.payload.loginSuccess) {
          //페이지 이동(여기서 오류가 나는 듯)
          //props.history.push("/");
          alert("로그인 성공!");
          navigate("/");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  const onClickHandler = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={onSubmitHandler}
      >
        <h2>로그인</h2>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "200%",
            height: "192px",
            left: "44px",
            top: "176px",
            background: "#CBF3F0",
            borderRadius: "20px",
          }}
        >
          <label>이메일</label>
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="이메일"
          />

          <label>비밀번호</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="비밀번호"
          />
        </div>
        <br />
        <button
          type="submit"
          style={{
            width: "125px",
            height: "40px",
            background: "#2EC3B6",
            border: "none",
            borderRadius: "10px",
            color: "#ffffff",
          }}
        >
          로그인
        </button>
        <br />
        <button
          onClick={onClickHandler}
          style={{
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
