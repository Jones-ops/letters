import { useState, useEffect } from 'react'
import './App.css'
import Introduction from './components/Introduction'
import WriterDashboard from './components/WriterDashboard'
import RecipientView from './components/RecipientView'
import FallingEmojis from './components/FallingEmojis'

function App() {
  const [letters, setLetters] = useState([])
  const [showEmojis, setShowEmojis] = useState(false)
  const [route, setRoute] = useState('intro') // 'intro', 'writer', 'recipient'
  const [viewingLetterId, setViewingLetterId] = useState(null)
  const [letterNotFound, setLetterNotFound] = useState(false)

  // Load letters from localStorage on mount
  useEffect(() => {
    const savedLetters = localStorage.getItem('letters')
    if (savedLetters) {
      try {
        setLetters(JSON.parse(savedLetters))
      } catch (e) {
        console.error('Failed to load letters:', e)
      }
    }
    
    // Handle URL hash routing
    handleRouting(window.location.hash)
  }, [])

  // Save letters to localStorage whenever they change
  useEffect(() => {
    if (letters.length > 0 || localStorage.getItem('letters')) {
      localStorage.setItem('letters', JSON.stringify(letters))
    }
  }, [letters])

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      handleRouting(window.location.hash)
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [letters])

  const handleRouting = (hash) => {
    if (!hash || hash === '#' || hash === '#/') {
      setRoute('intro')
      setViewingLetterId(null)
    } else if (hash.startsWith('#/view/')) {
      const letterId = parseInt(hash.substring(7))
      const letterExists = letters.some(l => l.id === letterId)
      
      if (letterExists) {
        setRoute('recipient')
        setViewingLetterId(letterId)
        setLetterNotFound(false)
        setShowEmojis(true)
      } else {
        setLetterNotFound(true)
        setRoute('recipient')
      }
    }
  }

  const handleEnterFromIntro = () => {
    setRoute('writer')
  }

  const handleAddLetter = (newLetter) => {
    const letter = {
      id: Date.now(),
      ...newLetter,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    setLetters([letter, ...letters])
  }

  const handleDeleteLetter = (letterId) => {
    setLetters(letters.filter(l => l.id !== letterId))
    window.location.hash = '#/'
  }

  const getLetterById = (id) => {
    return letters.find(l => l.id === id)
  }

  const getShareLink = (letterId) => {
    return `${window.location.origin}${window.location.pathname}#/view/${letterId}`
  }

  return (
    <div className="app">
      {showEmojis && route === 'recipient' && <FallingEmojis onComplete={() => setShowEmojis(false)} />}
      
      {route === 'intro' && (
        <Introduction onEnter={handleEnterFromIntro} />
      )}

      {route === 'writer' && (
        <WriterDashboard
          letters={letters}
          onAddLetter={handleAddLetter}
          onDeleteLetter={handleDeleteLetter}
          onGetShareLink={getShareLink}
        />
      )}

      {route === 'recipient' && (
        <>
          {letterNotFound ? (
            <div className="letter-not-found">
              <div className="error-container">
                <p>💭 Oops! Letter not found.</p>
                <p className="error-message">This link may have expired or the letter was deleted.</p>
                <a href="#/" className="back-link">← Return Home</a>
              </div>
            </div>
          ) : (
            <RecipientView
              letter={getLetterById(viewingLetterId)}
              onBackClick={() => {
                window.location.hash = '#/'
                setShowEmojis(false)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
