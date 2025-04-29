import React from 'react'
import "./ChatSelector.css"

export default function ChatSelector({user, otherUser, selectedSender, setSelectedSender}) {
  
  return (
    <div className="selector-wrapper">
      <div className="selector-container">
        <label>
          <input type="radio" value={user?.id} checked={selectedSender === user?.id} onChange={(e) => setSelectedSender(Number(e.target.value))} />
          나
        </label>

        {otherUser && (
          <label>
            <input type="radio" value={otherUser?.id} checked={selectedSender === otherUser?.id} onChange={(e) => setSelectedSender(Number(e.target.value))} />
              {otherUser.name}
          </label>
        )}
      </div>
    </div>
  )
}
