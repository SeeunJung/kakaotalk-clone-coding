import React, { useEffect, useState } from 'react';
import './ChatList.css';
import { useNavigate } from 'react-router-dom';

export default function ChatList() {
  const navigate = useNavigate();
  const [chatlistItem, setChatlistItem] = useState([]);
  
  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchChatAPI = async () => {
      try{
        const chatlistResponse = await fetch("https://goorm-kakaotalk-api.vercel.app/api/users/me/chatrooms",{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if(!chatlistResponse.ok)
          throw new Error("채팅 데이터를 불러오는 중 오류가 발생했습니다.");

        const chatlistData = await chatlistResponse.json();
        setChatlistItem(chatlistData);
      } catch(err){
        alert(`에러(${err})가 발생했습니다.`);
      }
    }
    fetchChatAPI();
  }, [token])
  
  return (
    <div className="chatlist-wrapper">
      <div className="chatlist-header">
        <h2>{user.name}의 채팅방</h2>
      </div>

      <div className="chatlist-container">
        <div className="my-chatlist">
          <div className="profile-container">
            <img className="profile-img" src={user.profile_image_url} alt="User Profile Image" onClick={() => navigate("/userprofile")}/>
            <div className="profile-content">
              <h3>{user.name}</h3>
              <p>{user.bio || "상태메세지가 없습니다."}</p>
            </div>
            <button className="chatself-button" onClick={() => navigate("/chatroom/self")}>나와의 채팅</button>
          </div>

          <div className="chatrooms">
            {chatlistItem.map((chatroom, index) => (
              <div className="profile-container" key={index}>
                <img className="profile-img" src={chatroom.other_user.profile_image_url} alt="Other User Profile Image" />
                <div className="profile-content">
                  <h3>{chatroom.other_user.name}</h3>
                  <p>{chatroom.last_message?.content || "이전 대화 내용이 존재하지 않습니다."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
