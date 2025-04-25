import React from 'react'
import "./UserProfile.css"

export default function EditProfile({username, bio, onUsernameChange, onBioChange, onCancel, onSave}) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="userprofile-wrapper">
      <div className="userprofile-image">
          <img src={user.profile_image_url} className="user-image" />
        </div>
        <div className="userprofile-input">
          <input type="text" value={username} placeholder="이름" onChange={(e) => onUsernameChange(e.target.value)}></input>
          <input type="text" value={bio} placeholder="상태메세지를 입력해주세요."  onChange={(e) => onBioChange(e.target.value)}></input>
        </div>
        <div className="userprofile-buttons">
          <button onClick={onCancel} >취소</button>
          <button onClick={onSave}>프로필 저장</button>
        </div>
    </div>
  )
}
