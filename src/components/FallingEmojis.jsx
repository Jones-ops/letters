import { useEffect, useState } from 'react'
import './FallingEmojis.css'

function FallingEmojis({ onComplete }) {
  const [emojis, setEmojis] = useState([])

  useEffect(() => {
    // Create falling emojis
    const newEmojis = []
    const emojiChars = ['❤️', '💕', '💖', '💗', '💝', '🌹', '💘']

    for (let i = 0; i < 30; i++) {
      newEmojis.push({
        id: Math.random(),
        left: Math.random() * 100,
        emoji: emojiChars[Math.floor(Math.random() * emojiChars.length)],
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 0.5
      })
    }

    setEmojis(newEmojis)

    // Complete the animation after all emojis have fallen
    const timer = setTimeout(() => {
      onComplete()
    }, 5500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="falling-emojis">
      {emojis.map((item) => (
        <div
          key={item.id}
          className="emoji-fall"
          style={{
            left: `${item.left}%`,
            '--duration': `${item.duration}s`,
            '--delay': `${item.delay}s`
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  )
}

export default FallingEmojis
