import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import BaroEditor from './pages/Baro_editor.jsx'
import Footer from './components/footer/Footer.jsx'
import Title from './components/title/Title.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <Outlet/>
  )
}

export default App
