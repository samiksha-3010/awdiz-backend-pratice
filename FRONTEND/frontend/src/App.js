import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Component/Home';
import Navbar from './Component/Navbar'
import Register from './Component/Register';
import Login from './Component/Login';

function App() {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route exact path='/'element={<Home/>}/>
        <Route exact path='/register-pratice'element={<Register/>}/>
        <Route exact path='/login-pratice'element={<Login/>}/>

      
      </Routes>
     

  
    </div>
  );
}

export default App;
