import './Introduction.css'

function Introduction({ onEnter }) {
  return (
    <div className="introduction-container">
      <div className="intro-content">
        <div className="intro-emoji">💕</div>
        <h1 className="intro-greeting">hello pretty thingggg</h1>
        <p className="intro-subtitle">Write and share your heartfelt letters</p>
        <button className="intro-button" onClick={onEnter}>
          ✨ Let's Begin ✨
        </button>
      </div>
    </div>
  )
}

export default Introduction
