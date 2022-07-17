import React, { useState } from 'react'
import "./register.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        gituser : "",
        password: ""
    })

    const handleChange = e =>{
        const {name,value}=e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const {name, gituser, password} = user 
        if (name && password && gituser){
            axios.post("http://localhost:9000/register", user)
            .then( res => {
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
                            navigate("/")
                       }, 3200);
                    break;
                }
            })
        }else{
            document.getElementById('failure').innerHTML="Fill all inputs";
            document.getElementById('failure').classList.add('show');
            setTimeout(function(){
                document.getElementById('failure').classList.remove('show');
            }, 3200);
        }
    }

    return(
        <div className="register">
            <div className='inner_reg'>
                <h1>Sign Up</h1>
                <input type="text" name='name' value={user.name} placeholder="Ingresa Nombre" onChange={ handleChange }></input>
                <input type="text" name='gituser' value={user.gituser} placeholder="Github Username" onChange={ handleChange }></input>
                <input type="password" name='password' value={user.password} placeholder="Ingresa Contraseña" onChange={ handleChange }></input>
                <div className="button" onClick={register}>Save</div>
                <div>or</div>
                <div className="button" onClick={() => navigate("/")}>Login</div>
                <div id='failure' className="alert-box failure"></div>
                <div id='success' className="alert-box success"></div>
            </div>
        </div>
    )
}

export default Register