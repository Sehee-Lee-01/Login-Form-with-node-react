import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage(props) {
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);
  const onClickHandler = () => {
    let confirmLogout = window.confirm("정말 로그아웃을 하시겠습니까?");
    if (confirmLogout) {
      axios.get(`api/users/logout`).then((response) => {
        if (response.data.success) {
          navigate("/login");
          alert("로그아웃 성공!");
        } else {
          alert("로그아웃 실패!");
        }
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>Hello!</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
