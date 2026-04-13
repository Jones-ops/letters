import './LetterList.css'

function LetterList({ letters, onViewLetter, onWriteNew }) {
  return (
    <div className="letter-list-container">
      <header className="app-header">
        <h1>💌 Love Letters</h1>
        <p className="subtitle">A place to share your heartfelt words</p>
      </header>

      <button className="write-new-btn" onClick={onWriteNew}>
        ✍️ Write a New Letter
      </button>

      <div className="letters-grid">
        {letters.length === 0 ? (
          <div className="empty-state">
            <p>No letters yet ...</p>
            <p className="empty-hint">Start by writing your first letter!</p>
          </div>
        ) : (
          letters.map((letter, index) => (
            <div
              key={letter.id}
              className="letter-card"
              onClick={() => onViewLetter(index)}
            >
              <div className="letter-header">
                <h3>{letter.title}</h3>
                <span className="letter-date">{letter.createdAt}</span>
              </div>
              <p className="letter-preview">
                {letter.content.substring(0, 150)}
                {letter.content.length > 150 ? '...' : ''}
              </p>
              <div className="letter-footer">
                <span className="read-more">Click to read →</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default LetterList
