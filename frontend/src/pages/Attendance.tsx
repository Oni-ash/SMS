
import React,{useState,useEffect} from 'react'
import api from '../services/api'
export default function Attendance(){
  const [records,setRecords]=useState<any[]>([])
  useEffect(()=>{ api('/students').then(data=>setRecords(data.map((s:any)=>({id:s.id,name:s.user.name,present:true})))) },[])
  async function save(){ await api('/attendance/take',{method:'POST',body:JSON.stringify({courseId:1,date:new Date(),records:records.map(r=>({studentId:r.id,present:r.present}))})}); alert('saved') }
  return <div className="card"><h2>Attendance</h2>{records.map((r,i)=>(<div key={r.id}><label><input type="checkbox" checked={r.present} onChange={e=>{const nr=[...records];nr[i].present=e.target.checked;setRecords(nr)}}/>{r.name}</label></div>))}<button className="btn" onClick={save}>Save</button></div>
}
