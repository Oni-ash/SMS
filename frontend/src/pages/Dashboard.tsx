
import React from 'react'
export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user')||'null')
  return <div className="card"><h2>Welcome {user?.name}</h2></div>
}
