import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

export default function Login() {
  //더미 데이터
  const User = {
    id: 'test@gmail.com',
    password: 'test@12345'
  }


  //id, password, confirm 초기값 세팅
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idValid, setIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllowed, setNotAllowed] = useState(true);

  const navigate = useNavigate();

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

  const onClickConfirmButton = () => {
    if(id === User.id && password === User.password){
      alert(`${id}님 환영합니다!`);
      navigate("/chatlist");
    }
    else{
      alert("로그인 실패!");
    }
  }

  useEffect(() => {
    if(idValid && passwordValid){
      setNotAllowed(false);
      return;
    }
    setNotAllowed(true);
  }, [idValid, passwordValid]);

  function handleClick(){
    navigate("/signup")
  }


  return (
    <div className="login-wrapper">
      <img className="logo" src="src\assets\logo.png"/>

      <form className="login-form">
        <input type="text" placeholder="아이디(E-mail)" value={id} onChange={handleId}/>
        <input type="password" placeholder="비밀번호" value={password} onChange={handlePassword}/>
        <button type="submit" disabled={notAllowed} onClick={onClickConfirmButton}>로그인</button>
      </form>
      <p className="redirect-link" onClick={handleClick}>이메일로 회원가입</p>
    </div>
  )
}
