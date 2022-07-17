import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";



function App() {
  const[ user, setLoginUser ] = useState({})
  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login setLoginUser={setLoginUser}/>} />
          <Route path="/user" element={user && user._id?<Homepage user={user} setLoginUser={setLoginUser}/>:<Login setLoginUser={setLoginUser}/>}></Route>
          <Route path="/user/:username" element={<Homepage setLoginUser={setLoginUser}/>}></Route>
          {/* <Route path="/login" element={<Login setLoginUser={setLoginUser}/>} /> */}
          <Route path="/register" element={<Register />} />
        </Routes>
      {/* <Homepage /> */}
      {/* <Login /> */}
      {/* <Register /> */}
    </div>
  );
}

export default App;
