import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        password: '',
        isAdmin: false
    })
    const handleRegister = (evt) =>{
        // const value = evt.target.value;
        setNewUser({
            ...newUser,
            [evt.target.name]: evt.target.value
        })
    }

    const register = async () =>{
        if(newUser.email && newUser.username && newUser.password){
            document.querySelector('.errorMsg').classList.remove('active')
            const url = 'http://localhost:8800/api/register'
            await axios.post(url,newUser)
            .then(res => {
                if(res.data.status){
                    axios.post(`http://localhost:8800/api/categories/create/${newUser.email}`)
                    .then(res => {
                        console.log(res.data)
                        localStorage.setItem('categoryadded',true)
                    })
                    navigate('/')
                }
                else{
                    document.querySelector('.errorMsg').textContent = res.data.error
                    document.querySelector('.errorMsg').classList.add('active')
                }
            })
        }  
        else{
            document.querySelector('.errorMsg').classList.add('active')
        }
    }
    const login = () =>{
        navigate('/')
    }
    return (
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
                        <h1 className="h3 mb-4">Register here</h1>
                        <div className="form-group">
                        <label className="label">email</label>
                        <input type="text" name="email" className="form-control" value={newUser.email} onChange={handleRegister}/>
                    </div>
                    <div className="form-group">
                        <label className="label">Username</label>
                        <input type="text" name="username" className="form-control" value={newUser.username} onChange={handleRegister}/>
                    </div>
                    <div className="form-group">
                        <label className="label">Password</label>
                        <input type="text" name="password" className="form-control" value={newUser.password} onChange={handleRegister}/>
                    </div>
                    
                        <div className="mt-4">
                            <button onClick={register} className="btn btn-primary">Register</button>
                            <p className="errorMsg">Please fill all fields</p>
                            <p className="errorMsg"></p>
                            <a className="mt-4" href="javascript:void(0)">Forgot password?</a>
                            <p className="mt-4 mb-1" >Aleady have an account?</p><a href="javascript:void(0)" onClick={login}>Login here</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
