<div align="center">

# 🚀 SamChat
[![Vercel](https://therealsam.site/api/vercel-badge)](https://samchat.vercel.app)
[![Railway](https://therealsam.site/api/railway-badge)](https://samchat-backend.up.railway.app)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

<div align="center">
  <img src="./demo.gif" width="800"/>
</div>

**Production-ready full-stack chat app** built with **React + Node.js + Tailwind**

📱 **Mobile-first UI** | ⚡ **Real-time messaging** | 🎨 **Dark/Light mode**

</div>

## ✨ Features (MVP Complete)

<div align="center">
<table>
<tr>
  <td>
    <b>✅ Core</b>
    <ul>
      <li>Real-time chat (HTTP polling)</li>
      <li>Message status (✓ ✓✓ ✓✓🔵)</li>
      <li>WhatsApp-style UI</li>
      <li>Auth (Email/Password)</li>
    </ul>
  </td>
  <td>
    <b>✅ Social</b>
    <ul>
      <li>User profiles</li>
      <li>Posts & feed</li>
      <li>Follow system ready</li>
    </ul>
  </td>
</tr>
</table>
</div>

## 🛠 Tech Stack

```mermaid
graph TB
  Frontend[React+Vite+Tailwind]
  Backend[Node+Express]
  DB[MongoDB]
  Frontend --> API[REST API]
  Backend --> DB
