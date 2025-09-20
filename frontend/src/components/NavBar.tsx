
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const nav = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    nav('/login')
  }
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="font-bold">OCMS</div>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/students" className="hover:underline">Students</Link>
          <Link to="/attendance" className="hover:underline">Attendance</Link>
          <Link to="/results" className="hover:underline">Results</Link>
          <button onClick={logout} className="ml-2 btn">Logout</button>
        </div>
      </div>
    </nav>
  )
}
