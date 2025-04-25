import React, { useState } from 'react'
import "./UserProfile.css"
import { useNavigate } from 'react-router-dom'
import DefaultProfile from './DefaultProfile.jsx';
import EditProfile from './EditProfile';

export default function UserProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [username, setUsername] = useState(user.name || "익명");
  const [bio, setBio] = useState(user.bio || "상태메세지가 없습니다.");
  const [edit, setEdit] = useState(false);

  const handleCancel = () => {
    setEdit(false);
    setUsername(user.name || "");
    setBio(user.bio || "");
  }

  const handleSave = () => {
    try{
      const userData = {name: username, bio, profile_image_url: user.profile_image_url, token};
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setEdit(false);
    } catch(err){
      alert(`프로필 업데이트 오류(${err})`)
    }
  }

  return (
    <div className="userprofile-wrapper">
      <div className="userprofile-backward">
          <p onClick={() =>navigate(-1)}>←</p>
      </div>
      <div className="userprofile-container">
        {!edit ? (<DefaultProfile user={user} onEdit={() => setEdit(true)} />)
         : (<EditProfile user={user} username={username} bio={bio} onUsernameChange={setUsername} onBioChange={setBio} onCancel={handleCancel} onSave={handleSave} />)}
      </div>
    </div>
  )
}
