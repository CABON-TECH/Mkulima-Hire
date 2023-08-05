import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import Register from "./pages/register"




function App() {
  return (
    <>
    <Router>
     <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        
        
        
      </Routes>
      <Footer />
     </div>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App