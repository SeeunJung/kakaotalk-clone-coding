import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import ChatList from "./pages/ChatList/ChatList"
import UserProfile from "./pages/UserProfile/UserProfile"
import ChatRoom from "./pages/ChatRoom/ChatRoom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/chatlist" element={<ChatList />} />
        <Route path = "/userprofile" element={<UserProfile />} />
        <Route path = "/chatroom/:chatroomId" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
