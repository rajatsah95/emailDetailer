import React from 'react'

export default function Timeline({ chain = [] }){
  if (!chain || chain.length === 0) return <p className="muted">No Received headers found.</p>

  return (
    <div className="timeline">
      {chain.map((line, idx) => (
        <div className="timeline-item" key={idx}>
          <div className="dot" />
          <div className="content">
            <pre className="received-line">{line}</pre>
          </div>
        </div>
      ))}
    </div>
  )
}
