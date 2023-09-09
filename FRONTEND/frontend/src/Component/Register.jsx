import React, { useContext, useEffect, useState } from 'react'
import './Style.css/Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
 import { AuthContext } from './Context/AuthContext'

const Register = () => {
    const  [userData,setuserData] = useState({name:"",email:"",password:"",confirmpassword:"",number:"",role:"Buyer"})
    const router= useNavigate()
     const {state} = useContext(AuthContext)
    //  console.log(userData,setuserData)

    const  handleChange =(event) =>{
        setuserData({...userData,[event.target.name]:event.target.value})
    }

    const selectRole=(event) =>{
        setuserData({...userData,[event.target.role]:event.target.value})
    }

    const handleSubmit = async(event)=>{
        event.preventDefault()
    if(userData.name && userData.email && userData.password && userData.confirmpassword && userData.number){
      if(userData.password===userData.confirmpassword){
        const response = await axios.post ('/register',{ userData })
        if(response.data.success){
            setuserData ({name:"",email:"",password:"",confirmpassword:"",number:"",role:"Buyer"})
            router("/login-pratice")
            toast.success(response.data.message)
        } else{
            toast.error(response.data.message)
        }
      } else{
        toast.error("password and confirm password is not match")
      }

    }toast.error("All Fields Are Mandotery")
    }
    // console.log(userData,"userData")
    useEffect(()=>{
       if (state?.user?.name){
        router("/")
       }
    },[state])
    

  return (
    <div className='register-style'>
        <form onSubmit={handleSubmit}>
          <fieldset>
      <label className='label-styyle'>Name</label><br/>
      <input className='input-style' type='text' name='name'  onChange={handleChange} value={userData.name}/><br/>
      <label className='label-styyle'>Role</label><br/>
      <select className='input-style'><br/>
        <option onChange={selectRole}>Seller</option>
        <option>Buyer</option>
        <option>Admin</option>
      </select><br/>
      <input className='input-style' type='text' name='role' onChange={handleChange} value={userData.role}/><br/>
      <label className='label-styyle'>Email</label><br/>
      <input className='input-style' type='text' name='email'  onChange={handleChange} value={userData.email}/><br/>
      <label className='label-styyle'>Password</label><br/>
      <input className='input-style' type='text' name='password'  onChange={handleChange} value={userData.password}/><br/>
      <label className='label-styyle'>Confirm Password</label><br/>
      <input className='input-style' type='text' name='confirmpassword'  onChange={handleChange} value={userData.confirmpassword}/><br/>
      <label className='label-styyle'>Number</label><br/>
      <input className='input-style' type='number' name='number'  onChange={handleChange} value={userData.number}/><br/>
      <input className='register-value' type='submit' value='Register'/><br/>
      </fieldset>
      </form>
      <p  onClick={()=> router('/login-pratice')}><u >Already Have a Acount? Login </u></p>
    </div>
  )
}

export default Register