import React, { useState } from 'react'
import "./Signup.css";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"

export default function Signup() {


  //id, password, confirmedPassword, name, phoneNumber 초기값 세팅
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    const navigate = useNavigate();

  const idRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])([0-9]).{8,15}$/
  const phoneNumberRegEx = /^[0-9]*$/;

  const handleId = (e) => {
    setId(e.target.value);
    if(id && !idRegEx.test(id))
      setErrorAlert("아이디는 이메일 형식으로 입력하셔야 합니다.");
    else
      setErrorAlert("");   
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if(password && !passwordRegEx.test(password))
      setErrorAlert("비밀번호를 올바른 형식으로 입력하셔야 합니다.")
    else
      setErrorAlert("");
  }

  const handleConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
    if(password !== e.target.value)
      setErrorAlert("비밀번호가 일치하지 않습니다.")
    else
      setErrorAlert("");
  };

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    if(!phoneNumberRegEx.test(e.target.value))
      setErrorAlert("숫자만 입력해주세요.");
    else
      setErrorAlert("");
  };

//Button 비활성화
const notAllowed = id === "" || password === "" || confirmedPassword === "" || name === "" || phoneNumber === "" || errorAlert;

  const handleSignup = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("https://goorm-kakaotalk-api.vercel.app/api/signup",
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: id,
            password: password,
            name,
            phoneNumber
          })
        }
      );

      alert(`${name}님 환영합니다! 로그인 페이지로 돌아갑니다.`);
      navigate("/")
    }
    catch(err){
      console.log(err);
      alert("에러가 발생했습니다.")
    }
  }


  return (
    <div className="signup-wrapper">
      <div className="signup-heading">
        <img className="logo" src={logo} alt="KakaoTalk Logo"/>
        <p>회원가입</p>
      </div>

      <form className="signup-form" onSubmit={handleSignup}>
        <div className="info-input">
          <div className="user-info">
            <label htmlFor="id">아이디<br/>(E-mail)</label>
            <input id="id" type="text" placeholder="이메일" value={id} onChange={handleId}></input> 
          </div>

          <div className="user-info">
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" placeholder="비밀번호" value={password} onChange={handlePassword}></input>
          </div>

          <div className="user-info">
            <label htmlFor="password-confirm">비밀번호 확인</label>
            <input id="password-confirmed" type="password" placeholder="비밀번호 확인" value={confirmedPassword} onChange={handleConfirmedPassword}></input>
          </div>

          <div className="user-info">
            <label htmlFor="username">이름</label>
            <input id="username" type="text" placeholder="이름" value={name} onChange={handleName}></input> 
          </div>

          <div className="user-info">
            <label htmlFor="phone-number">전화번호</label>
            <input id="phone-number" type="text" placeholder="전화번호" value={phoneNumber} onChange={handlePhoneNumber}></input> 
          </div>
        </div>
        {errorAlert && (<span className="error-alert">{errorAlert}</span>)}
        <button className="signup-button" type="submit" disabled={notAllowed}>회원가입</button>
      </form>
      
    </div>
  )
}
