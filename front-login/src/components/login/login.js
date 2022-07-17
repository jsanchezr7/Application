import React, { useState } from 'react'
import "./login.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = ({setLoginUser}) => {

    const navigate = useNavigate()

    const [ user, setUser] = useState({
        gituser: "",
        password: ""
    })

    const handleChange = e =>{
        const {name,value}=e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9000/login", user)
        .then(res => {
            setLoginUser(res.data.user)
            if(res.data.user){
                navigate("/user")
                }
            switch(res.data.type){
                case 0:
                    document.getElementById('failure').innerHTML=res.data.message;
                    document.getElementById('failure').classList.add('show');
                    setTimeout(function(){
                        document.getElementById('failure').classList.remove('show');
                   }, 3200);
                break;
                case 1:
                    document.getElementById('success').innerHTML=res.data.message;
                    document.getElementById('success').classList.add('show');
                    setTimeout(function(){
                        document.getElementById('success').classList.remove('show');
                   }, 3200);
                break;
            }
            
        })
    }

    return(
        <div className="login">
            <div className='inner_login'>
                <h1>Login</h1>
                <input type="text" name='gituser' value={user.gituser} placeholder="Github username" onChange={ handleChange }></input>
                <input type="password" name='password' value={user.password} placeholder="Ingresa Contraseña" onChange={ handleChange }></input>
                <button type="button" className="btn btn-primary" onClick={login}>Sign In</button>
                <a href='https://github.com/login/oauth/authorize?client_id=22d94d324bf35bb94d9b'><button type="button" className="btn btn-dark" >Sign in with <i className="fa-brands fa-github"></i> Github</button></a>
                <div>or</div>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/register")}>Sign Up</button>
                <div id='failure' className="alert-box failure"></div>
                <div id='success' className="alert-box success"></div>
            </div>
        </div>
    )
}

export default Login