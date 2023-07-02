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
  const [homeViewMode,setHomeViewMode]= useState('overview')
  function logout(){
    setMobileMenuToggle(false)
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <>
    { sessionStorage.getItem('isLogin') &&   
      <><div className="mobileTopNav">
      <h1 className="logo logoHeading mobile mb-0">My Expenses</h1>
      <button className="hamburger" onClick={()=>setMobileMenuToggle(!mobileMenuToggle)}>{mobileMenuToggle ? <i className="fa fa-xmark"></i> : <i className="fas fa-bars"></i>}</button>
      </div>    
      <div className={`sideNav navigation ${mobileMenuToggle ? 'active' : ''}`}>
        <h1 className="logo logoHeading">My Expenses</h1>
        <ul className="mainMenu list-unstyled">
            <li className="active"><Link to="/home"><i className="fas fa-chart-pie me-2"></i>Dashboard</Link></li>
            <li><a href="#" className='disabled'><i className="fas fa-gear"></i> Settings</a></li>
            <li><a onClick={logout} href="#"><i className="fas fa-arrow-right-from-bracket"></i> Log out</a></li>
        </ul>
      </div></>}
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/home" element={<Home homeViewMode={homeViewMode}></Home>}></Route>
        <Route path="/bookDetails" element={<BookDetails setHomeViewMode={setHomeViewMode}></BookDetails>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
