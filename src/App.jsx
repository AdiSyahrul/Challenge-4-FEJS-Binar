import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Input from './pages/Input/Input';

function App (){
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/input" element ={<Input/>}/>
    </Routes>
    </>
  );
};

export default App;