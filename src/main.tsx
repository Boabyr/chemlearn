import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard       from './pages/Dashboard'
import LoginPage       from './pages/LoginPage'
import CoursePage      from './pages/CoursePage'
import TopicPage       from './pages/TopicPage'
import TutorDashboard  from './pages/TutorDashboard'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/'                            element={<Dashboard />} />
        <Route path='/login'                       element={<LoginPage />} />
        <Route path='/course/:courseId'            element={<CoursePage />} />
        <Route path='/course/:courseId/:topicId'   element={<TopicPage />} />
        <Route path='/tutor'                       element={<TutorDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
