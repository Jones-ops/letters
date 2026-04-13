import { useState } from 'react'
import './WriterDashboard.css'
import WriteLetterForm from './WriteLetterForm'

function WriterDashboard({ letters, onAddLetter, onDeleteLetter, onGetShareLink }) {
  const [isWriting, setIsWriting] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  const handleCopyLink = (letterId) => {
    const link = onGetShareLink(letterId)
    navigator.clipboard.writeText(link)
    setCopiedId(letterId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isWriting) {
    return (
      <WriteLetterForm
        onSubmit={(letter) => {
          onAddLetter(letter)
          setIsWriting(false)
        }}
        onCancel={() => setIsWriting(false)}
      />
    )
  }

  return (
    <div className="writer-dashboard-container">
      <button className="home-btn" onClick={() => (window.location.hash = '#/')}>
        💕 Home
      </button>

      <header className="writer-header">
        <h1>💌 Love Letters</h1>
        <p className="writer-subtitle">Write and share your heartfelt letters</p>
      </header>

      <button className="write-new-btn" onClick={() => setIsWriting(true)}>
        ✍️ Write a New Letter
      </button>

      <div className="letters-section">
        <h2 className="section-title">Your Letters</h2>
        
        {letters.length === 0 ? (
          <div className="empty-state">
            <p>No letters yet...</p>
            <p className="empty-hint">Write your first letter to get started!</p>
          </div>
        ) : (
          <div className="writer-letters-grid">
            {letters.map((letter) => (
              <div key={letter.id} className="writer-letter-card">
                <div className="letter-header">
                  <h3>{letter.title}</h3>
                  <span className="letter-date">{letter.createdAt}</span>
                </div>

                <p className="letter-preview">
                  {letter.content.substring(0, 150)}
                  {letter.content.length > 150 ? '...' : ''}
                </p>

                <div className="letter-actions">
                  <button
                    className={`copy-link-btn ${copiedId === letter.id ? 'copied' : ''}`}
                    onClick={() => handleCopyLink(letter.id)}
                  >
                    {copiedId === letter.id ? '✓ Copied!' : '🔗 Copy Link'}
                  </button>
                  
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm('Delete this letter?')) {
                        onDeleteLetter(letter.id)
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>

                <div className="link-info">
                  <small>Share this link with the recipient</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WriterDashboard
