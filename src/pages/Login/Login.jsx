import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import logo from "../../assets/logo.png"
import { isValidEmail } from '../../utils/validators';
import { fetchWithToken, postWithoutToken } from '../../utils/api';

export default function Login() {

  //id, password, confirm 초기값 세팅
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const navigate = useNavigate();
  const notAllowed = id==="" || password === "" || !isValidEmail(id);

  const handleId = (e) => {
    setId(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    if(id && !isValidEmail(id))
      setErrorAlert("아이디는 이메일 형식으로 입력하셔야 합니다.");
    else
      setErrorAlert("");
  }, [id]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const loginData = await postWithoutToken("https://goorm-kakaotalk-api.vercel.app/api/signin", {
        email: id,
        password: password,
      })
      
      const jwtToken = loginData.accessToken;
      if(!jwtToken){
        throw new Error("서버로부터 토큰을 받지 못했습니다.");
      }

      localStorage.setItem("userToken", jwtToken);

      const userData = await fetchWithToken("https://goorm-kakaotalk-api.vercel.app/api/users/me");

      localStorage.setItem("user", JSON.stringify(userData));

      alert("로그인 성공");
      navigate("/chatlist")
    }
    catch(err){
      console.log(err);
      alert("로그인 중 에러가 발생했습니다." + err.message);
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
