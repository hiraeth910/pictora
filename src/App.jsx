import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'
import LoginPage from './auth/LoginPage';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
      <Route path="/" element ={<LoginPage/>}/>
    </Routes>
   </Router>
  )
}

export default App
