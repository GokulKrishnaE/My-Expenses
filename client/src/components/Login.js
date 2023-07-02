import { useState } from "react"
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom"

function Login(){

    const [user, setUser] = useState({
        username: '',
        password:''
    })

    const navigate = useNavigate()

    function handleLogin(evt){
        const value = evt.target.value
        setUser({
            ...user,
            [evt.target.name]: value
          });
    }
    function login(){
        axios.post('http://localhost:8800/api/login',user).then(res => {
        if(res.data.token){
            document.querySelector('.errorMsg').classList.remove('active')
            sessionStorage.setItem('token',res.data.token)
            sessionStorage.setItem('isLogin',true)
            sessionStorage.setItem('userEmail',res.data.user[0].email)
            sessionStorage.setItem('userName',res.data.user[0].username)
            navigate('/home')
        }
        else{
            document.querySelector('.errorMsg').textContent = res.data.error
            document.querySelector('.errorMsg').classList.add('active')
        }
    })
    }
    function register(){
        navigate('/register')
    }
    return(
        <div className="processContainer">
            <div className="widgetBox">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="processPagesLeft">
                            <div>
                                <h1>My Expenses</h1>
                                <p>A solution to manage your daily expenses</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="processPagesRight">
                        <h1 className="h3 mb-4">Login here</h1>
                        <div className="form-group">
                            <label className="label">Username</label>
                            <input type="text" name="username" className="form-control" value={user.username} onChange={handleLogin}/>
                        </div>
                        <div className="form-group">
                            <label className="label">Password</label>
                            <input type="text" name="password" className="form-control" value={user.password} onChange={handleLogin}/>
                        </div>
                        <div className="mt-4">
                            <button onClick={login} className="btn btn-primary">Login</button>
                            <p className="errorMsg"></p>
                            <a className="mt-4" href="#">Forgot password?</a>
                            <p className="mt-4" onClick={register}>Does not have an account? <a href="javascript:void(0">Sign up here</a></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login