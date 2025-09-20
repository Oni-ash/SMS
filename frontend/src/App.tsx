
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Results from './pages/Results'

export default function App() {
  const token = localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/students" element={token ? <Students /> : <Navigate to="/login" />} />
      <Route path="/attendance" element={token ? <Attendance /> : <Navigate to="/login" />} />
      <Route path="/results" element={token ? <Results /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
    </Routes>
  )
}
