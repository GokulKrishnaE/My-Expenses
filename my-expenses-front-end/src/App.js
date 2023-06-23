import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from './components/home';
import BookDetails from './components/home-page/Book-Details';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate()
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false)
  function logout(){
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <>
    { sessionStorage.getItem('isLogin') &&   
      <><div class="mobileTopNav">
      <h1 class="logo logoHeading mobile">My Expenses</h1>
      <button class="hamburger" onClick={()=>setMobileMenuToggle(!mobileMenuToggle)}><i class="fa fa-bars"></i></button>
      </div>    
      <div className={`sideNav navigation ${mobileMenuToggle ? 'active' : ''}`}>
        <h1 className="logo logoHeading">My Expenses</h1>
        <ul className="mainMenu list-unstyled">
            <li className="active"><Link to="/home"><i className="fas fa-home me-2"></i>Home</Link></li>
            <li><Link to="/fullDetails"><i className="fas fa-wallet me-2"></i>Full Details</Link></li>
            <li><a href="#" className='disabled'><i className="fas fa-gear"></i> Settings</a></li>
            <li><a onClick={logout} href="#"><i className="fas fa-arrow-right-from-bracket"></i> Log out</a></li>
        </ul>
      </div></>}
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/bookDetails" element={<BookDetails></BookDetails>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
