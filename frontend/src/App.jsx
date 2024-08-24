import react from "react"
import './index.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import LandingPage from "./pages/LandingPage"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import Navbar from "./components/Navbar";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import Footer from "./components/Footer";
import Tutoring from "./pages/Tutoring";
import Profile from "./pages/Profile";
import Resource from "./pages/Resource";


function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <ScrollToHashElement behavior="smooth" inline="center" block="center"/>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route
          path="/tutoringRequest"
          element={
            <ProtectedRoute>
              <Tutoring />
            </ProtectedRoute>
          }
        />
        <Route path="/resources" element={<Resource/>}/>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer></Footer>
    
    </BrowserRouter>
  )
}

export default App