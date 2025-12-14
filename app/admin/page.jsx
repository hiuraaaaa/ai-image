'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [keys, setKeys] = useState([])

  async function login() {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      setLoggedIn(true)
      loadKeys()
    } else {
      alert('Login gagal')
    }
  }

  async function loadKeys() {
    const res = await fetch('/api/admin/apikey')
    const data = await res.json()
    setKeys(data.data || [])
  }

  async function createKey() {
    const res = await fetch('/api/admin/apikey', { method: 'POST' })
    const data = await res.json()
    setKeys(prev => [...prev, data.data])
  }

  if (!loggedIn) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Admin Login</h1>

        <input
          className={styles.input}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={login}>
          Login
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>API Keys</h1>

      <button className={styles.button} onClick={createKey}>
        Generate API Key
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Key</th>
            <th className={styles.th}>Credits</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(k => (
            <tr key={k.id}>
              <td className={styles.td}>{k.key}</td>
              <td className={styles.td}>{k.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
