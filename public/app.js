async function api(path, opts={}){
  const token = localStorage.getItem('dn_token');
  const headers = Object.assign({'content-type':'application/json'}, opts.headers || {});
  if(token) headers['authorization'] = 'Bearer ' + token;
  const res = await fetch('/api'+path, Object.assign({headers}, opts));
  return res.json();
}

async function loadLists(){
  const donations = await api('/donations');
  const requests = await api('/requests');
  const drives = await api('/drives');
  document.getElementById('donationList').innerHTML = donations.map(d=>`<li>${d.item} — ${d.quantity} (${d.status})</li>`).join('') || '<li>No donations</li>';
  document.getElementById('requestList').innerHTML = requests.map(r=>`<li>${r.item} — ${r.quantity} (${r.status})</li>`).join('') || '<li>No requests</li>';
  document.getElementById('driveList').innerHTML = drives.map(d=>`<li>${d.title} — ${d.description||''}</li>`).join('') || '<li>No drives</li>';

  // populate assign selects
  const aDon = document.getElementById('assignDonation');
  const aReq = document.getElementById('assignRequest');
  aDon.innerHTML = donations.filter(x=>x.status==='available').map(x=>`<option value="${x.id}">${x.item} (${x.quantity})</option>`).join('')||'<option value="">(none)</option>';
  aReq.innerHTML = requests.filter(x=>x.status==='open').map(x=>`<option value="${x.id}">${x.item} (${x.quantity})</option>`).join('')||'<option value="">(none)</option>';

  // assignments listing
  const data = await fetch('/data.json').then(r=>r.json());
  document.getElementById('assignmentList').innerHTML = (data.assignments||[]).map(a=>`<li>${a.coordinator} → donation:${a.donationId} request:${a.requestId} (${a.status})</li>`).join('')||'<li>No assignments</li>';
}

document.getElementById('donationForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const f = e.currentTarget;
  const body = { donor: f.donor.value, item: f.item.value, quantity: Number(f.quantity.value), notes: f.notes.value };
  await api('/donations', { method: 'POST', body: JSON.stringify(body) });
  f.reset();
  loadLists();
});

// simple check: show login link when not authenticated
async function checkAuth(){
  const token = localStorage.getItem('dn_token');
  if(!token) return;
  const me = await fetch('/api/auth/me', { headers: { 'authorization': 'Bearer ' + token } }).then(r=>r.json()).catch(()=>null);
  if(me && !me.error) {
    // show simple user indicator
    const nav = document.querySelector('header nav');
    const el = document.createElement('span');
    el.style.color='#fff';
    el.style.marginLeft='12px';
    el.textContent = me.username + ' (' + me.role + ')';
    nav.appendChild(el);
  }
}

checkAuth();

document.getElementById('requestForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const f = e.currentTarget;
  const body = { recipient: f.recipient.value, item: f.item.value, quantity: Number(f.quantity.value), location: f.location.value };
  await api('/requests', { method: 'POST', body: JSON.stringify(body) });
  f.reset();
  loadLists();
});

document.getElementById('driveForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const f = e.currentTarget;
  const body = { title: f.title.value, description: f.description.value };
  await api('/drives', { method: 'POST', body: JSON.stringify(body) });
  f.reset();
  loadLists();
});

document.getElementById('assignBtn').addEventListener('click', async ()=>{
  const donationId = document.getElementById('assignDonation').value;
  const requestId = document.getElementById('assignRequest').value;
  const coordinator = document.getElementById('assignCoordinator').value||'Coordinator';
  const eta = document.getElementById('assignEta').value||null;
  if(!donationId||!requestId){ alert('Select donation and request'); return; }
  await api('/assign', { method: 'POST', body: JSON.stringify({ donationId, requestId, coordinator, eta }) });
  loadLists();
});

document.getElementById('refreshBtn').addEventListener('click', loadLists);

loadLists();
