import React from 'react'
import { logout } from '../lib/api'

export default function Home({ user, onLogout }){
  async function doLogout(){
    await logout()
    localStorage.removeItem('dn_token')
    onLogout()
  }

  return (
    <div style={{padding:20}}>
      <h2>Welcome, {user.username} ({user.role})</h2>
      <p>This React client is connected to the DonateNow API.</p>
      <button onClick={doLogout}>Logout</button>
    </div>
  )
}
