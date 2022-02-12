import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
export default function Auth(SpecificComponent, option, adminRoute = null) {
  //null => 아무나 출입가능
  //true => 로그인 유저 가능
  //false => 로그인 유저 불가능
  function AuthenticationCheck(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인 하지 얺은 상태
        if (!response.payload.isAuth) {
          if (option) {
            //로그인 페이지로 가게 만들기
            navigate("/login");
          }
        } else {
          //로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            //랜딩페이지로 보내기
            navigate("/");
          } else {
            if (!option) {
              //랜딩페이지로 보내기
              navigate("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
