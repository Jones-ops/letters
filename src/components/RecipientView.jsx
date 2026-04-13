import './RecipientView.css'

function RecipientView({ letter, onBackClick }) {
  if (!letter) {
    return (
      <div className="recipient-loading">
        <p>Loading letter...</p>
      </div>
    )
  }

  return (
    <div className="recipient-view-container">
      <div className="recipient-letter-wrapper">
        <article className="recipient-letter-content">
          <header className="recipient-letter-header">
            <button className="recipient-back-btn" onClick={onBackClick}>
              ← Home
            </button>
            
            <h1>{letter.title}</h1>
            <p className="recipient-letter-date">{letter.createdAt}</p>
          </header>

          <div className="recipient-letter-text">
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph || <br />}</p>
            ))}
          </div>

          <footer className="recipient-letter-footer">
            <p className="message-to-recipient">
              💕 A letter shared with you
            </p>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default RecipientView
