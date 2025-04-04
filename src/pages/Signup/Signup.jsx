import React from 'react'
import "./Signup.css";

export default function Signup() {
  

  return (
    <div className="signup-wrapper">
      <div className="signup-heading">
        <img className="logo" src="src\assets\logo.png"/>
        <p>회원가입</p>
      </div>

      <form className="signup-form">
        <div className="info-input">
          <div className="user-info">
            <label htmlFor="id">아이디<br/>(E-mail)</label>
            <input id="id" type="text" placeholder="이메일"></input> 
          </div>

          <div className="user-info">
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" placeholder="비밀번호"></input>
          </div>

          <div className="user-info">
            <label htmlFor="password-check">비밀번호 확인</label>
            <input id="password-check" type="password" placeholder="비밀번호확인"></input>
          </div>

          <div className="user-info">
            <label htmlFor="username">이름</label>
            <input id="username" type="text" placeholder="이름"></input> 
          </div>

          <div className="user-info">
            <label htmlFor="phone-number">전화번호</label>
            <input id="phone-number" type="text" placeholder="전화번호"></input> 
          </div>
        </div>
        
        <button className="signup-button" type="submit" disabled={true}>회원가입</button>
      </form>
      
    </div>
  )
}
