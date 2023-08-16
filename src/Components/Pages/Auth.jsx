import React, { useRef, useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [login, setLogin] = useState(false)
  const [sendingReq, setSendingReq] = useState(false);
  const [openalert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMsg, setAlertMsg] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate()

  const AuthHandler = async (obj) => {
    try {
      setSendingReq(true);
      let response;
      if (login) {
        response = await axios.post(`http://localhost:3010/users/login`, obj);
      }
      else {
        response = await axios.post(`http://localhost:3010/users/signup`, obj);
          setLogin(true);
      }
      console.log('Auth api being called')
      setSendingReq(false);
      setAlertSeverity('success');
      setAlertMsg(response.data.msg);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      if(login) navigate('/home')
    } catch (error) {
      console.log(error);
      setAlertSeverity('error');
      setSendingReq(false);
      console.log(error)
      setAlertMsg(error.response.data.msg);
    }
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000)
  }


  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let Obj = {
      // email: emailRef.current.value,
      // password: passwordRef.current.value
      email: 'sahilkumar2275@gmail.com',
      password:'Sahil'
    }
    passwordRef.current.value = emailRef.current.value = "";
    login ? AuthHandler(Obj) : AuthHandler(Obj)
  }


  return (
    <div className="mt-[50px] flex flex-col items-center p-8 " >
      <div className=" grid sm:grid-cols-2 sm:grid-rows-1 p-7 bg-gradient-to-r from-[#1F2937] to-[#5e779b] ... ">
        <div className=" bg-white p-5 flex flex-col justify-evenly">

          {openalert && <Alert severity={alertSeverity}>{alertMsg}!</Alert>}

          <form className="  min-h-[400px] flex flex-col justify-evenly " action="" onSubmit={formSubmitHandler}>
            <p className="font-Indie text-4xl font-bold tracking-[4px]">{login ? 'Login' : 'SignUp'}</p>

            <div className="flex flex-col py-3">
              <label>Email :</label>
              <input ref={emailRef} className="text-center border-b-4 p-2 border-gray-400" type="email" ></input>
            </div>
            <div className="flex flex-col py-3">
              <label >Password</label>
              <input ref={passwordRef} className=" text-center border-b-4 p-2 border-gray-400" type="string" ></input>
            </div>

            {!sendingReq && <button className="bg-[#1F2937] rounded-md active:bg-[#586b86] duration-700 text-white text-2xl p-2 text-center" >{login ? 'login' : 'signUp '}</button>}
            {sendingReq && <button className="bg-[#1F2937] rounded-md active:bg-[#586b86] duration-700 text-white text-2xl p-2 text-center">sending Req</button>}

          </form>
          <div className="text-2xl p-2 text-center font-QuickSand " onClick={() => setLogin((state) => !state)}>
            <button >{login ? 'New User??' : 'Already a member??'}
              <p>Click Here</p></button>
          </div>
        </div>
        <div className=" hidden sm:block bg-white   ">
          <img className="object-cover max-h-[650px] w-full " src="https://images.unsplash.com/photo-1528329140527-75853b1e1650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" alt="" />

        </div>
      </div>
    </div>


  );
}

export default Auth







