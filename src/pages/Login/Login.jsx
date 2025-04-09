import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import logo from "../../assets/logo.png"

export default function Login() {

  //id, password, confirm 초기값 세팅
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const navigate = useNavigate();
  const idRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const notAllowed = id==="" || password === "" || !idRegEx.test(id);

  const handleId = (e) => {
    setId(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    if(id && !idRegEx.test(id))
      setErrorAlert("아이디는 이메일 형식으로 입력하셔야 합니다.");
    else
      setErrorAlert("");
  }, [id]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("https://goorm-kakaotalk-api.vercel.app/api/signin",
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: id,
            password: password
          })
        }
      );

      const loginData = await response.json();
      const jwtToken = loginData.accessToken;
      localStorage.setItem("userToken", jwtToken);

      const userResponse = await fetch(
        "https://goorm-kakaotalk-api.vercel.app/api/users/me",
        {
          headers:{
            Authorization: `Bearer ${jwtToken}`
          }
        }
      );

      const userData = await userResponse.json();
      localStorage.setItem("user", JSON.stringify(userData));

      alert("로그인 성공");
      navigate("/chatlist")
    }
    catch(err){
      console.log(err);
      alert("에러가 발생했습니다.")
    }
  }

  return (
    <div className="login-wrapper">
      <img className="logo" src={logo} alt="KakaoTalk Logo"/>

      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" placeholder="아이디(E-mail)" value={id} onChange={handleId}/>
        <input type="password" placeholder="비밀번호" value={password} onChange={handlePassword}/>
        <button type="submit" disabled={notAllowed}>로그인</button>
        {errorAlert && (<span className="error-alert">{errorAlert}</span>)}
      </form>
      <p className="redirect-link" onClick={() => {navigate("/signup")}}>이메일로 회원가입</p>
    </div>
  )
}
