import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Dashboard kommt noch</div>} />
        <Route path='/login' element={<div>Login kommt noch</div>} />
        <Route path='/course/:courseId' element={<div>Kurs kommt noch</div>} />
        <Route path='/course/:courseId/:topicId' element={<div>Thema kommt noch</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
