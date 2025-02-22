import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import LoginPage from './auth/LoginPage';
import PanDetailsForm from './Screens/PanDetailsForm';

function App() {

  return (
   <Router>
    <Routes>
            <Route path="/" element ={<PanDetailsForm/>}/>

      <Route path="/login" element ={<LoginPage/>}/>
    </Routes>
   </Router>
  )
}

export default App
