import axios from 'axios'
import './Style.css/Login.css'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

const Login = () => {
  const {state,dispatch} = useContext(AuthContext)
  const [userData,setuserData] =  useState ({email:"",password:""})
  const router= useNavigate()
 
  const handleChange=(event) =>{
    setuserData({...userData,[event.targrt.name]:event.targrt.value})
  }
  const handleSubmit = async (event)=>{
event.preventDefault()
if(userData.email && userData.password){
  const response = await axios.post("/login",{userData})
  if(response.data.success){
    dispatch ({
      type:"LOGIN",
      payload:"response.data.user"
    })
    localStorage.setItem("token",JSON.stringify(response.data.token))
    userData ({email:"",password:""})
    router("/")
    toast.success(response.data.message)
  }else{
    toast.error(response.data.message)
  }
}else{
  toast.error("All fields are maedotry")
}

  }
  useEffect (()=>{
    if(state?.user?.name){
      router("/")
    }

  },[state])
  return (
    <div className='loginn-style'>
       <form  onSubmit={handleSubmit}>
        <fieldset>
         <label  className='labbel'>Email</label><br/>
         <input className='innput-style' type='email' name='email' onChange={handleChange} value={userData.email}/><br/>
          <label className='labbel'>Password</label><br/>
         <input  className='innput-style' type='password' name='password' onChange={handleChange}  value={userData.password}/>
         <input type='submit' value='Login'/>
         </fieldset>
       </form>
       {/* <p onClick={router=("/register-pratice")} style={{color:"black"}}><u>New User Register Here?</u></p> */}
    </div>
  )
}

export default Login;