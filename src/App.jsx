import './css/bootstrap.min.css'
import './App.css';
import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import Cart from './components/Cart';
import Order from './components/Order';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState('')
  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} token={token} setToken={setToken}/>
      <Routes>
        <Route path='/' element={<Products isAuth={isAuth} token={token}/>}/>
        <Route path='/cart' element={<Cart token={token}/>}/>
        <Route path='/order' element={<Order token={token}/>}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} setToken={setToken}/>}/>
        <Route path='/reg' element={<Registration/>}/>
      </Routes>
      <Footer/>    
    </div>
  );
}

export default App;
