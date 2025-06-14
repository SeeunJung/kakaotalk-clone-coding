import React, { useEffect, useState } from 'react'
import "./ChatRoom.css"
import { useNavigate, useParams } from 'react-router-dom'
import ChatBubble from '../../components/ChatBubble';
import ChatSelector from '../../components/ChatSelector';

export default function ChatRoom() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [selectedSender, setSelectedSender] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("userToken");
  const{chatroomId} = useParams();

  useEffect(() => {
    const fetchChatData = async() => {
      try{
        // 채팅방 정보 가져오기
        if(!user || !token){
          alert("로그인 정보가 없습니다.");
          navigate("/login");
          return;
        }

        if(!chatroomId){
          alert("채팅 정보가 없습니다.");
          navigate("/chatlist");
          return;
        }

        const chatroomResponse = await fetch(`https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if(!chatroomResponse.ok)
          throw new Error("채팅방 정보를 불러올 수 없습니다.");
        const chatroomData = await chatroomResponse.json();
        setOtherUser(chatroomData.other_user);

        setSelectedSender(user.id);

        // 채팅 내역 가져오기
        const chatResponse = await fetch(`https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}/chats`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if(!chatResponse.ok)
          throw new Error("채팅 메시지를 불러올 수 없습니다.");
        const chatData = await chatResponse.json();
        setMessages(chatData);
      } catch(err){
        alert(`${err}`)
      }
    }
    fetchChatData();
  }, [chatroomId, token]);


  // 메시지 전송
  const handleNewMessage = async() => {
    if(!newMessage.trim())
      return;

    try{
      const response = await fetch(`https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}/chats`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          sender_id: selectedSender,
          content: newMessage
        })
      });
      if(!response.ok)
        throw new Error("메시지 전송 실패");

      const sent = await response.json();

      setMessages((prev) => [...prev, sent]);
      setNewMessage("");
    }
    catch(err){
      alert(err.message);
    }
  };

  return (
    <div className="chatroom-wrapper">
      <div className="chatroom-container">

        {/* 채팅방 헤더 */}
        <div className="chatroom-header">
          <p onClick={() => navigate("/chatlist")}>←</p>
          <h2>{otherUser?.name || user.name}</h2>
        </div>

        {/* 채팅방 메세지 목록 */}
        <div className="chatroom-content-wrapper">
          <div className="chatroom-content">
            {messages.map((msg) => {
              const isMine = msg.sender_id === user.id;
              return(
                <ChatBubble key={msg.id} isOther={!isMine} chatData={msg} sentData={isMine? user: otherUser} />
              )
            }
            )}
          </div>
        </div>
      </div>

      {/* 메시지 선택자 */}
      {otherUser && otherUser.id !== user.id && <ChatSelector user={user} otherUser={otherUser} selectedSender={selectedSender} setSelectedSender={setSelectedSender} />}

      {/* 메세지 입력창 & 전송 버튼 */}
      <div className="chatroom-input">
          <textarea placeholder="메시지 입력" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) =>{
            if(e.key === "Enter" && !e.shiftKey){
              e.preventDefault();
              handleNewMessage();
            }
          }}></textarea>
          <button onClick={handleNewMessage}>↑</button>
        </div>
    </div>
  )
}
