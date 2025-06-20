import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import Add from './Pages/Add/Add'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const URL = "https://nomad-bite-backend.onrender.com";
  // const URL = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={URL}/>} />
          <Route path="/list" element={<List url={URL}/>} />
          <Route path="/orders" element={<Orders url={URL}/>} />
        </Routes>
      </div>
      
    </div>
  )
}

export default App
