import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Component/Home';
import Navbar from './Component/Navbar'

function App() {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route exact path='/'element={<Home/>}/>
      
      </Routes>
     

     <h2>Home</h2>
    </div>
  );
}

export default App;
