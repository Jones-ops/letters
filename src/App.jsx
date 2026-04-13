import { useState, useEffect } from 'react'
import './App.css'
import Introduction from './components/Introduction'
import WriterDashboard from './components/WriterDashboard'
import RecipientView from './components/RecipientView'
import FallingEmojis from './components/FallingEmojis'
import { initializeDatabase, getLetters, addLetter, deleteLetter, getLetter } from './services/tursoService'

function App() {
  const [letters, setLetters] = useState([])
  const [showEmojis, setShowEmojis] = useState(false)
  const [route, setRoute] = useState('intro') // 'intro', 'writer', 'recipient'
  const [viewingLetterId, setViewingLetterId] = useState(null)
  const [letterNotFound, setLetterNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize database and load letters on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeDatabase()
        const loadedLetters = await getLetters()
        setLetters(loadedLetters)
      } catch (error) {
        console.error('Error initializing app:', error)
      } finally {
        setLoading(false)
      }
      
      // Handle URL hash routing
      handleRouting(window.location.hash)
    }
    
    initializeApp()
  }, [])

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

  const handleAddLetter = async (newLetter) => {
    const letter = {
      id: Date.now(),
      ...newLetter,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    // Add to Turso
    const success = await addLetter(letter)
    if (success) {
      setLetters([letter, ...letters])
    }
  }

  const handleDeleteLetter = async (letterId) => {
    const success = await deleteLetter(letterId)
    if (success) {
      setLetters(letters.filter(l => l.id !== letterId))
      window.location.hash = '#/'
    }
  }

  const getLetterById = (id) => {
    return letters.find(l => l.id === id)
  }

  const getShareLink = (letterId) => {
    return `${window.location.origin}${window.location.pathname}#/view/${letterId}`
  }

  if (loading) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '1.2em' }}>Loading...</div>
      </div>
    )
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
