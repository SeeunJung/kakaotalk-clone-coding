import React, { useEffect, useState } from 'react'
import "./Signup.css";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"

export default function Signup() {
    //더미 데이터
  const User = {
    id: 'test@gmail.com',
    password: 'test@12345',
    phoneNumber: '01000000000',
  }


    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const [idValid, setIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const [notAllowed, setNotAllowed] = useState(true);


    const handleId = (e) => {
      setId(e.target.value);
      const idRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
      if(idRegEx.test(id)){
        setIdValid(true);
      }else{
        setIdValid(false);
      }
    }
  
    const handlePassword = (e) => {
      setPassword(e.target.value);
      const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
      if(passwordRegEx.test(password)){
        setPasswordValid(true);
      }else{
        setPasswordValid(false);
      }
    }

    const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
      if(password === e.target.value){
        setConfirmPasswordValid(true);
      }else{
        setConfirmPasswordValid(false);
      }
    }
  
    const handleName = (e) => {
      setName(e.target.value);
    }

    const handlePhoneNumber = (e) => {
      setPhoneNumber(e.target.value);
      const phoneNumberRegex = /^[0-9]*$/;
      if(phoneNumberRegex.test(e.target.value)){
        setPhoneNumberValid(true);
      }else{
        setPhoneNumberValid(false);
      }
    }




useEffect(() => {
    if(idValid && passwordValid && confirmPasswordValid && phoneNumberValid){
      setNotAllowed(false);
      return;
    }
    setNotAllowed(true);
  }, [idValid, passwordValid, confirmPasswordValid, phoneNumberValid]);


  const onClickConfirmButton = () => {
    if(id === User.id && password === User.password && phoneNumber === User.phoneNumber){
      alert(`${name}님 환영합니다! 로그인 페이지로 돌아갑니다.`);
      navigate("/");
    }
    else{
      alert("로그인 실패!");
    }
  }





  return (
    <div className="signup-wrapper">
      <div className="signup-heading">
        <img className="logo" src={logo} alt="KakaoTalk Logo"/>
        <p>회원가입</p>
      </div>

      <form className="signup-form">
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
            <label htmlFor="password-check">비밀번호 확인</label>
            <input id="password-check" type="password" placeholder="비밀번호확인" value={confirmPassword} onChange={handleConfirmPassword}></input>
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
        
        <button className="signup-button" type="submit" disabled={notAllowed} onClick={onClickConfirmButton}>회원가입</button>
      </form>
      
    </div>
  )
}
