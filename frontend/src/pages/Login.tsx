
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      nav('/dashboard')
    } catch (err:any) {
      alert(err.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={submit}>
          <div className="mb-2">
            <input className="input" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <input type="password" className="input" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="btn" disabled={loading}>{loading ? '...' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}
