document.getElementById('loginForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const f = e.currentTarget;
  const body = { username: f.username.value, password: f.password.value };
  const res = await fetch('/api/auth/login', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(body) });
  const j = await res.json();
  if(res.ok && j.token){
    localStorage.setItem('dn_token', j.token);
    window.location = '/';
  } else {
    alert(j.error || 'Login failed');
  }
});
