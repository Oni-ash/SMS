
import React, { useEffect, useState } from 'react'
import api from '../services/api'

type Student = { id: number, rollNo: string, user: { name: string, email: string } }

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const data = await api('/students')
      setStudents(data)
    } catch (err:any) {
      alert('Failed to load students: ' + err.message)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students</h2>
      <div className="card">
        {loading ? <div>Loading...</div> : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Roll</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s=> (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.user.name}</td>
                  <td className="p-2">{s.user.email}</td>
                  <td className="p-2">{s.rollNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
