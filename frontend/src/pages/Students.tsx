
import React, {useState,useEffect} from 'react'
import api from '../services/api'
export default function Students(){
  const [students,setStudents]=useState<any[]>([])
  useEffect(()=>{ api('/students').then(setStudents) },[])
  return <div className="card"><h2>Students</h2><ul>{students.map(s=>(<li key={s.id}>{s.user.name} - {s.rollNo}</li>))}</ul></div>
}
