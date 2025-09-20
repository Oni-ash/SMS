
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      nav('/dashboard')
    } catch(e:any){ alert(e.message) }
  }
  return (<div className="card"><h2>Login</h2><form onSubmit={submit}>
    <input className="input" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
    <input type="password" className="input" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
    <button className="btn">Login</button>
  </form></div>)
}
