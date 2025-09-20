
import React from 'react'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">Students module</div>
        <div className="card">Attendance module</div>
        <div className="card">Results & Exams</div>
      </div>
    </div>
  )
}
