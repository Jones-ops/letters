import { createClient } from '@libsql/client/web'

const tursoUrl = import.meta.env.VITE_TURSO_URL
const tursoToken = import.meta.env.VITE_TURSO_TOKEN

if (!tursoUrl || !tursoToken) {
  throw new Error('Missing Turso credentials. Check .env.local file.')
}

const client = createClient({
  url: tursoUrl,
  authToken: tursoToken
})

// Initialize database table
export async function initializeDatabase() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS letters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        letter_id INTEGER UNIQUE NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `)
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }
}

// Get all letters
export async function getLetters() {
  try {
    const result = await client.execute('SELECT * FROM letters ORDER BY id DESC')
    return result.rows.map(row => ({
      id: row.letter_id,
      title: row.title,
      content: row.content,
      createdAt: row.created_at
    }))
  } catch (error) {
    console.error('Failed to fetch letters:', error)
    return []
  }
}

// Get a single letter by ID
export async function getLetter(letterId) {
  try {
    const result = await client.execute({
      sql: 'SELECT * FROM letters WHERE letter_id = ?',
      args: [letterId]
    })
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return {
      id: row.letter_id,
      title: row.title,
      content: row.content,
      createdAt: row.created_at
    }
  } catch (error) {
    console.error('Failed to fetch letter:', error)
    return null
  }
}

// Add a new letter
export async function addLetter(letter) {
  try {
    const result = await client.execute({
      sql: 'INSERT INTO letters (letter_id, title, content, created_at) VALUES (?, ?, ?, ?)',
      args: [letter.id, letter.title, letter.content, letter.createdAt]
    })
    console.log('Letter added successfully')
    return true
  } catch (error) {
    console.error('Failed to add letter:', error)
    return false
  }
}

// Delete a letter
export async function deleteLetter(letterId) {
  try {
    await client.execute({
      sql: 'DELETE FROM letters WHERE letter_id = ?',
      args: [letterId]
    })
    console.log('Letter deleted successfully')
    return true
  } catch (error) {
    console.error('Failed to delete letter:', error)
    return false
  }
}

export default client
