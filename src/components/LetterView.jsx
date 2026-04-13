import './LetterView.css'

function LetterView({ letter, onBackClick, onDeleteClick }) {
  return (
    <div className="letter-view-container">
      <button className="back-btn" onClick={onBackClick}>
        ← Back to Letters
      </button>

      <div className="letter-content-wrapper">
        <article className="letter-content">
          <header className="letter-view-header">
            <h1>{letter.title}</h1>
            <p className="letter-date-view">{letter.createdAt}</p>
          </header>

          <div className="letter-text">
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph || <br />}</p>
            ))}
          </div>

          <footer className="letter-view-footer">
            <button
              className="delete-btn"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this letter?')) {
                  onDeleteClick()
                }
              }}
            >
              🗑️ Delete Letter
            </button>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default LetterView
