import React from 'react'
import "./ChatBubble.css"

export default function ChatBubble({isOther, chatData, sentData}) {
  return (
    <>
      {isOther ? (
        <div className="chatbubble-wrapper-other">
          <img src={sentData.profile_image_url} alt="프로필 이미지" className="chatbubble-profile-img" />
          <div className="chatbubble-container">
            <p className="chatbubble-username">{sentData.name}</p>
            <div className="chatbubble-content chat-content-other">
              <p>{chatData.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbubble-wrapper-mine">
          <div className="chatbubble-content chat-content-mine">
            <p>{chatData.content}</p>
          </div>
        </div>
      )}
    </>
  );
}
