import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function RegisterPage(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // email, passwors state 만들기(리액트 훅)
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // page refresh 방지
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        //페이지 이동
        navigate("/login");
        alert("회원가입 성공! 환영합니다.");
      } else {
        alert("회원가입 실패! 입력란을 다시 확인해주세요.");
      }
    });
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
        <h2>회원가입</h2>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "200%",
            height: "300px",
            left: "44px",
            top: "176px",
            background: "#CBF3F0",
            borderRadius: "20px",
          }}
        >
          <label>이메일</label>
          <input type="email" value={Email} onChange={onEmailHandler} />

          <label>이름</label>
          <input type="text" value={Name} onChange={onNameHandler} />

          <label>비밀번호</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="비밀번호(5자 이상)"
          />

          <label>비밀번호 확인</label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            style={{ border: "none", borderRadius: "5px" }}
          />
        </div>
        <br />
        <button
          type="submit"
          style={{
            width: "138px",
            height: "47px",
            left: "138px",
            top: "397px",
            background: "#2EC3B6",
            borderRadius: "10px",
            border: "none",
          }}
        >
          화원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
