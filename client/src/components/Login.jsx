import React, { useState } from 'react'
import { login } from '../lib/api'

export default function Login({ onLogin }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function submit(e){
    e.preventDefault()
    const res = await login(username, password)
    if(res && res.token){
      localStorage.setItem('dn_token', res.token)
      onLogin(res.user)
    } else {
      setError(res?.error||'Login failed')
    }
  }

  return (
    <main style={{maxWidth:420,margin:'40px auto'}}>
      <h1>Sign in</h1>
      <form onSubmit={submit}>
        <label>Username<br/>
          <input value={username} onChange={e=>setUsername(e.target.value)} required />
        </label>
        <label style={{display:'block',marginTop:8}}>Password<br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button type="submit" style={{marginTop:12}}>Login</button>
      </form>
      {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
      <p style={{marginTop:12,fontSize:13}}>Demo accounts: admin/adminpass, donor/donorpass, recipient/recipientpass, logistics/logisticspass</p>
    </main>
  )
}
