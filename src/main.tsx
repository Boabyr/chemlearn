import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import Dashboard       from './pages/Dashboard'
import LoginPage       from './pages/LoginPage'
import CoursePage      from './pages/CoursePage'
import TopicPage       from './pages/TopicPage'
import TutorDashboard  from './pages/TutorDashboard'
import PracticeMode    from './pages/PracticeMode'
import ExamSimulator   from './pages/ExamSimulator'
import LernSession     from './pages/LernSession'
import Statistik       from './pages/Statistik'
import Einstellungen   from './pages/Einstellungen'
import ErrorBoundary   from './components/Shell/ErrorBoundary'
import RequireAuth     from './components/Shell/RequireAuth'
import { AuthProvider } from './context/AuthProvider'
import Aktualisierung  from './components/Shell/Aktualisierung'
import FokusWechsel    from './components/Shell/FokusWechsel'
import Verbindungshinweis from './components/Shell/Verbindungshinweis'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Lernstand ändert sich durch eigene Eingaben, nicht durch andere Leute.
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const geschuetzt = (element: React.ReactNode) => <RequireAuth>{element}</RequireAuth>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Verbindungshinweis />
          <BrowserRouter>
            <FokusWechsel />
            <Routes>
              <Route path='/login'                     element={<LoginPage />} />
              <Route path='/'                          element={geschuetzt(<Dashboard />)} />
              <Route path='/course/:courseId'          element={geschuetzt(<CoursePage />)} />
              <Route path='/course/:courseId/:topicId' element={geschuetzt(<TopicPage />)} />
              <Route path='/tutor'                     element={geschuetzt(<TutorDashboard />)} />
              <Route path='/lernen'                    element={geschuetzt(<LernSession />)} />
              <Route path='/statistik'                 element={geschuetzt(<Statistik />)} />
              <Route path='/einstellungen'             element={geschuetzt(<Einstellungen />)} />
              <Route path='/practice'                  element={geschuetzt(<PracticeMode />)} />
              <Route path='/exam-simulator'            element={geschuetzt(<ExamSimulator />)} />
              <Route path='*'                          element={<Navigate to='/' replace />} />
            </Routes>
          </BrowserRouter>
          <Aktualisierung />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
