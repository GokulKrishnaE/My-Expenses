import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from './components/home';
import FullDetails from './components/home-page/FullDetails';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate()
  function logout(){
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <>
    { sessionStorage.getItem('isLogin') &&       
      <div className="sideNav navigation">
        <h1 className="logo logoHeading">My Expenses</h1>
        <ul className="mainMenu list-unstyled">
            <li className="active"><Link to="/home"><i className="fas fa-home me-2"></i>Home</Link></li>
            <li><Link to="/fullDetails"><i className="fas fa-wallet me-2"></i>Full Details</Link></li>
            <li><a href="#" className='disabled'><i className="fas fa-gear"></i> Settings</a></li>
            <li><a onClick={logout} href="#"><i className="fas fa-arrow-right-from-bracket"></i> Log out</a></li>
        </ul>
      </div>}
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/fulldetails" element={<FullDetails></FullDetails>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
