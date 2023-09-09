import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'


const Navbar = () => {
  const router = useNavigate()
  const {state,dispatch} = useContext(AuthContext)
  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
        <h2>Logo</h2>
        {state?.user?.role == "Seller"&&<h2>Mens</h2>}
        {state?.user?.role == "Seller"&&<h2>Womes</h2>}
        {state?.user?.role == "Seller"&&<h2>Kids</h2>}

        {state?.user?.role == "Seller"&&<h2>Add Product</h2>}
        {state?.user?.role == "Seller"&& <h2>Your Product</h2>}

        <div  style={{width:"20%",display:"flex",justifyContent:"space-around"}}>
          { state?.user?.name ? <>
        <h2 onClick={()=> router('/profile-pratice')}>Profile</h2>
        <h2 onClick={()=>dispatch({type:"LOGOUT"})}>Logout</h2>
        </>: <h2 onClick={()=> router('/login-pratice')}>Login/Register</h2>}
        </div>
    </div>
  )
}

export default Navbar