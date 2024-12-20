import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Pages from './Components/Pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/pages" element = {<Pages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
