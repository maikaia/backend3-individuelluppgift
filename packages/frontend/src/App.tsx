import React from 'react';
import { Route, Routes } from "react-router-dom"

import Home from './pages/Home';
import ChooseName from './pages/ChooseName';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseName />} />
        <Route path="/chat" element={<Home />} />

      </Routes>
    </>
  )
}

export default App