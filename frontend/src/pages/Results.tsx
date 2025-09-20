
import React, { useEffect, useState } from 'react'
import api from '../services/api'

type Result = { id:number, marks:number, grade:string, exam:{title:string}, student:{user:{name:string}} }

export default function Results() {
  const [results, setResults] = useState<Result[]>([])

  useEffect(()=>{
    async function load(){
      try {
        const data = await api('/exams/results')
        setResults(data)
      } catch(e:any){ alert(e.message) }
    }
    load()
  },[])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Results</h2>
      <div className="card">
        <table className="w-full table-auto">
          <thead>
            <tr><th className="p-2">Student</th><th className="p-2">Exam</th><th className="p-2">Marks</th><th className="p-2">Grade</th></tr>
          </thead>
          <tbody>
            {results.map(r=>(
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.student.user.name}</td>
                <td className="p-2">{r.exam.title}</td>
                <td className="p-2">{r.marks}</td>
                <td className="p-2">{r.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
