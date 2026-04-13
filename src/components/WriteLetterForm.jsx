import { useState } from 'react'
import './WriteLetterForm.css'

function WriteLetterForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    if (!content.trim()) {
      setError('Please write your letter')
      return
    }

    onSubmit({
      title: title.trim(),
      content: content.trim()
    })

    setTitle('')
    setContent('')
  }

  return (
    <div className="write-letter-container">
      <button className="back-btn" onClick={onCancel}>
        ← Back
      </button>

      <div className="form-wrapper">
        <h1>💕 Write Your Letter</h1>

        <form onSubmit={handleSubmit} className="letter-form">
          <div className="form-group">
            <label htmlFor="title">Letter Title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g., A Love Letter, A Thank You Note..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              autoFocus
            />
            <span className="char-count">{title.length}/100</span>
          </div>

          <div className="form-group">
            <label htmlFor="content">Your Letter</label>
            <textarea
              id="content"
              placeholder="Write your heartfelt message here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
            />
            <span className="char-count">{content.length} characters</span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              📤 Post Letter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WriteLetterForm
