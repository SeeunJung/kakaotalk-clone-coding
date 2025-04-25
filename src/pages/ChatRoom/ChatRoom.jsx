import React from 'react'
import "./ChatRoom.css"
import { useNavigate } from 'react-router-dom'

export default function ChatRoom() {
  const navigate = useNavigate();
  return (
    <div className="chatroom-wrapper">
      <div className="chatroom-container">

        {/* 채팅방 헤더 */}
        <div className="chatroom-header">
          <p onClick={() => navigate("/chatlist")}>←</p>
          <h2>Username</h2>
        </div>

        {/* 채팅방 메세지 목록 */}
        <div className="chatroom-content-wrapper">
          <div className="chatroom-content">
            <div>Messages</div>
          </div>
        </div>

        {/* 메세지 입력창 & 전송 버튼 */}
        <div className="chatroom-input">
          <textarea placeholder="메시지 입력"></textarea>
          <button>↑</button>
        </div>
      </div>
    </div>
  )
}
