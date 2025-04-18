import React, { useEffect, useState } from 'react'
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
    const navigate = useNavigate();

    //errorAlert 분리, 상태 저장
    const [idErrorAlert, setIdErrorAlert] = useState("");
    const [passwordErrorAlert, setPasswordErrorAlert] = useState("");
    const [confirmedPasswordErrorAlert, setConfirmedPasswordErrorAlert] = useState("");
    const [phoneNumberErrorAlert, setPhoneNumberErrorAlert] = useState("");

  const idRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  const phoneNumberRegEx = /^[0-9]*$/;

  //useEffect 적용
  //아이디 유효성 검사
  const handleId = (e) => {
    setId(e.target.value);
  };

    useEffect(() => {
    if(id && !idRegEx.test(id)){
      setIdErrorAlert("아이디는 이메일 형식으로 입력하셔야 합니다.");
    }
    else{
      setIdErrorAlert("");
    }
  }, [id]);

  //비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if(password && !passwordRegEx.test(password)){
      setPasswordErrorAlert("비밀번호를 올바른 형식으로 입력하셔야 합니다.");
    }
    else{
      setPasswordErrorAlert("");
    }
  }, [password]);

  //비밀번호 확인 유효성 검사
  const handleConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };

  useEffect(() => {
    if(password !== confirmedPassword){
      setConfirmedPasswordErrorAlert("비밀번호가 일치하지 않습니다.")
    } 
    else{
      setConfirmedPasswordErrorAlert("");
    }
  }, [confirmedPassword]);

  //이름 입력
  const handleName = (e) => {
    setName(e.target.value);
  }

  //핸드폰 번호 유효성 검사
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    if(!phoneNumberRegEx.test(phoneNumber)){
      setPhoneNumberErrorAlert("숫자만 입력해주세요.");
    }
    else{
      setPhoneNumberErrorAlert("");
    } 
  }, [phoneNumber]);

//Button 비활성화
const notAllowed = id === "" || password === "" || confirmedPassword === "" || name === "" || phoneNumber === "" || idErrorAlert || passwordErrorAlert || confirmedPasswordErrorAlert || phoneNumberErrorAlert;

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
          {idErrorAlert && (<span className="error-alert">{idErrorAlert}</span>)}
          
          <div className="user-info">
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" placeholder="비밀번호" value={password} maxLength={15} onChange={handlePassword}></input>
          </div>
          {passwordErrorAlert && (<span className="error-alert">{passwordErrorAlert}</span>)}

          <div className="user-info">
            <label htmlFor="password-confirm">비밀번호 확인</label>
            <input id="password-confirmed" type="password" placeholder="비밀번호 확인" value={confirmedPassword} maxLength={15} onChange={handleConfirmedPassword}></input>
          </div>
          {confirmedPasswordErrorAlert && (<span className="error-alert">{confirmedPasswordErrorAlert}</span>)}

          <div className="user-info">
            <label htmlFor="username">이름</label>
            <input id="username" type="text" placeholder="이름" value={name} onChange={handleName}></input> 
          </div>

          <div className="user-info">
            <label htmlFor="phone-number">전화번호</label>
            <input id="phone-number" type="text" placeholder="전화번호" value={phoneNumber} maxLength={11} onChange={handlePhoneNumber}></input> 
          </div>
          {phoneNumberErrorAlert && (<span className="error-alert">{phoneNumberErrorAlert}</span>)}
        </div>
        <button className="signup-button" type="submit" disabled={notAllowed}>회원가입</button>
      </form>
      
    </div>
  )
}
