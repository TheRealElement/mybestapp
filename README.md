# mybestapp – Security Vulnerability Demo & Fix

This project was developed for a cybersecurity course final assignment.
It demonstrates a **controlled security vulnerability** and its remediation, including **Before/After** security scans.

---

## 🚀 Overview

The app is a simple Node.js + Express web application simulating AI-like behavior, with the following custom modules:

- `lovable.js` – adds emotional flavor to text
- `cursorAI.js` – simulates AI response
- `base44Handler.js` – mimics encoding logic

---

## ⚠️ Introduced Vulnerabilities (for educational purposes)

1. **Outdated dependency**: `express@4.17.0`  
   - Causes multiple **High severity** issues via transitive dependencies:
     - `cookie`
     - `qs`
     - `path-to-regexp`
     - `send`
     - `body-parser`

2. **Reflected XSS** at `/vulnerable`
   ```js
   app.get('/vulnerable', (req, res) => {
       const name = req.query.name || '';
       res.send(`Hello ${name}, welcome!`); // Unsanitized input
   });
   ```
   Visit:
   ```
   http://localhost:3000/vulnerable?name=<script>alert('XSS')</script>
   ```
   → Will execute JavaScript in the browser.

---

## 🛠️ Fixes Implemented

1. **Updated Express** to `4.21.2` (latest at time of fix) – eliminates the dependency vulnerabilities.
2. **Removed vulnerable route** and kept only a safe version using `lodash.escape`:
   ```js
   const { escape } = require('lodash');
   app.get('/safe', (req, res) => {
       const name = req.query.name || '';
       res.send(`Hello ${escape(name)}, welcome!`);
   });
   ```
   Now the above malicious input is rendered as text, not executed.

---

## 📊 Security Scan Results

### Before Fix (`express@4.17.0` + `/vulnerable`)
```
7 vulnerabilities (3 low, 4 high)
```
See: [audit-vulnerable.txt](audit-vulnerable.txt)

### After Fix (`express@4.21.2` + `/safe` only)
```
found 0 vulnerabilities
```
See: [audit-fixed.txt](audit-fixed.txt)

---

## 💻 Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/<USERNAME>/mybestapp.git
   cd mybestapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Test endpoints:
   - Vulnerable (if branch `introduce-vulns`):  
     `http://localhost:3000/vulnerable?name=<script>alert('XSS')</script>`
   - Safe:  
     `http://localhost:3000/safe?name=<script>alert('XSS')</script>`

---

## 📝 Notes

- This demo is **for educational purposes only** – do not deploy with vulnerabilities in production.
- The repo contains both vulnerable and fixed versions for comparison.

---
