
import React,{useState,useEffect} from 'react'
import api from '../services/api'
export default function Results(){
  const [results,setResults]=useState<any[]>([])
  useEffect(()=>{ api('/exams/results').then(setResults) },[])
  return <div className="card"><h2>Results</h2><ul>{results.map(r=>(<li key={r.id}>{r.student.user.name} - {r.exam.title}: {r.marks}</li>))}</ul></div>
}
