import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./UserProfile.css"

export default function DefaultProfile({user, onEdit}) {
  const navigate = useNavigate();
  return (
    <div className="userprofile-wrapper">
      <div className="userprofile-image">
          <img src={user.profile_image_url} className="user-image" />
        </div>
        <div className="userprofile-content">
          <h3>{user.name || "익명"}</h3>
          <p>{user.bio || "상태메세지가 없습니다."}</p>
        </div>
        <div className="userprofile-buttons">
          <button onClick={() => navigate("/chatroom/me")}>나와의 채팅</button>
          <button onClick={onEdit} >프로필 편집</button>
        </div>
    </div>
  )
}
