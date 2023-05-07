import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from './components/home';
import { useState } from 'react';

function App() {
  const navigate = useNavigate()
  function logout(){
    localStorage.clear()
    navigate('/')
  }
  return (
    <>
    { localStorage.getItem('isLogin') &&       
      <div className="sideNav navigation">
        <h1 className="logo logoHeading">My Expenses</h1>
        <ul className="mainMenu list-unstyled">
            <li className="active"><Link to="/home"><i className="fas fa-home"></i> Home</Link></li>
            <li><a href="javascript:void(0)" className='disabled'><i className="fas fa-wallet"></i> Expense Breakdown</a></li>
            <li><a href="javascript:void(0)" className='disabled'><i className="fas fa-gear"></i> Settings</a></li>
            <li><a onClick={logout} href="javascript:void(0)"><i className="fas fa-arrow-right-from-bracket"></i> Log out</a></li>
        </ul>
      </div>}
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
      </Routes>
    </>
  );
}

export default App;
