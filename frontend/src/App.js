import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Cover from './pages/Cover';


function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<Cover />} />
      </Routes>
    </div>
  );
}

export default App;