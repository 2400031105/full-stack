const base = '' // same origin during dev; if dev server runs on 5173, it will proxy in production or use full URL

async function req(path, opts={}){
  const token = localStorage.getItem('dn_token')
  const headers = Object.assign({'content-type':'application/json'}, opts.headers||{})
  if(token) headers.authorization = 'Bearer ' + token
  const res = await fetch(base + path, Object.assign({headers}, opts))
  return res.json()
}

export function login(username, password){
  return req('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) })
}

export function logout(){
  return req('/api/auth/logout', { method: 'POST' })
}

export function getMe(){
  return req('/api/auth/me')
}

export default { login, logout, getMe }
