import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import ChatList from "./pages/ChatList/ChatList"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/chatlist" element={<ChatList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
