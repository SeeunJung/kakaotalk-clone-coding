import React from 'react';
import './ChatList.css';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"

export default function ChatList() {
  const navigate = useNavigate();
  
  return (
    <div className="chatlist-wrapper">
      <div className="chatlist-header">
        <h2>채팅 (이름)</h2>
      </div>

      <div className="chatlist-container">
        <div className="my-chatlist">
          <div className="profile-container">
            <img className="profile-img" src={logo} alt="User Profile Image"/>
            <div className="profile-content">
              <h3>사용자 이름</h3>
              <p>상태메세지가 없습니다.</p>
            </div>
            <button className="chatself-button" onClick={() => navigate("/chatlist/self")}>나와의 채팅</button>
          </div>

          <div className="chatroom">
            <div className="profile-container">
              <img className="profile-img" src={logo} alt="User Profile Image" />
              <div className="profile-content">
                <h3>다른 채팅방</h3>
                <p>마지막 대화가 다 보인다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
