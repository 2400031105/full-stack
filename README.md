# DonateNow — Minimal Donation Platform

This is a minimal, local-first prototype web app to organize donations, requests and simple logistics.

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Run the server:

```bash
npm start
```

3. Open http://localhost:3000 in your browser.

What's included:
- `server.js` — Express server with simple JSON datastore (`data.json`) and REST endpoints.
- `public/` — Static frontend (HTML/CSS/JS) with forms for Donor, Recipient, Admin and Logistics Coordinator workflows.
- `data.json` — Simple JSON file persisted on the server for demo purposes.

Notes:
- This is a prototype to demonstrate workflows. For production use, replace `data.json` with a proper DB, add authentication, validation and security.
