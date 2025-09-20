
import React, { useEffect, useState } from 'react'
import api from '../services/api'

type StudentRow = { studentId: number, present: boolean, name: string }

export default function Attendance() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [courseId, setCourseId] = useState<number>(1)
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10))

  useEffect(()=>{
    async function load() {
      try {
        const data = await api('/students')
        setStudents(data.map((s:any)=>({ studentId: s.id, name: s.user.name, present: true })))
      } catch (e:any) { alert(e.message) }
    }
    load()
  },[])

  async function submit() {
    try {
      await api('/attendance/take', {
        method: 'POST',
        body: JSON.stringify({ courseId, date, records: students.map(s=>({ studentId: s.studentId, present: s.present })) })
      })
      alert('Saved attendance')
    } catch (e:any) { alert(e.message) }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance</h2>
      <div className="card">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input mb-4" />
        <table className="w-full table-auto">
          <thead><tr><th className="p-2">Name</th><th className="p-2">Present</th></tr></thead>
          <tbody>
            {students.map((s,i)=>(
              <tr key={i} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2">
                  <input type="checkbox" checked={s.present} onChange={e=>{
                    const ns=[...students]; ns[i].present=e.target.checked; setStudents(ns)
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn mt-4" onClick={submit}>Save</button>
      </div>
    </div>
  )
}
