import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { getMe } from './lib/api'

export default function App(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function check(){
      setLoading(true)
      const me = await getMe()
      if(me && !me.error) setUser(me)
      setLoading(false)
    }
    check()
  },[])

  if(loading) return <div style={{padding:20}}>Loading...</div>
  if(!user) return <Login onLogin={(u)=>setUser(u)} />
  return <Home user={user} onLogout={()=>setUser(null)} />
}
