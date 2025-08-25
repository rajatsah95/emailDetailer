import React, { useEffect, useState } from 'react'
import { getTestInfo, getEmails, getStats } from '../api'
import Timeline from './Timeline'

export default function Dashboard(){
  const [info, setInfo] = useState(null)
  const [emails, setEmails] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(()=>{
    async function load(){
      try{
        const t = await getTestInfo();
        setInfo(t);
        const e = await getEmails(20);
        setEmails(e);
        const s = await getStats();
        setStats(s);
      }catch(err){
        console.error(err);
      }
    }
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  },[])

  return (
    <div className="container">
      <header className="header">
        <h1>Email Analyzer</h1>
        <p className="subtitle">Visualize the receiving chain & detect sender ESP</p>
      </header>

      <section className="panel">
        <h2>Test mailbox</h2>
        {info ? (
          <div>
            <p><strong>Send test email to:</strong> <code>{info.testMailAddress}</code></p>
            <p><strong>Use subject token:</strong> <code>{info.testSubjectToken}</code></p>
            <p>Send a simple email (plain text) to the address above. The backend polls your mailbox and will process the first unseen email with the token in the subject.</p>
          </div>
        ) : <p>Loading test info…</p>}
      </section>

      <section className="panel">
        <h2>Latest processed emails</h2>
        {emails.length === 0 ? <p>No processed emails yet.</p> : (
          emails.map(email => (
            <div key={email._id} className="email-card">
              <div className="email-meta">
                <div><strong>From:</strong> {email.from}</div>
                <div><strong>Subject:</strong> {email.subject}</div>
                <div><strong>ESP:</strong> <span className="esp-pill">{email.esp}</span></div>
              </div>
              <Timeline chain={email.receivedChain} />
            </div>
          ))
        )}
      </section>

      <footer className="panel footer">
        <small>Auto-poll interval: every 10s (server-configurable)</small>
      </footer>
    </div>
  )
}
