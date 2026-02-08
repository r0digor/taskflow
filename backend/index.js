const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express()

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./database.db')

app.get('/', (req, res) => {
    res.send('TaskFlow API is running')
})

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`)

app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.json(rows)
    })
})

app.post('/tasks', (req, res) => {
    const { title } = req.body

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' })
    }

    const query = 'INSERT INTO tasks (title, completed) VALUES (?, ?)'

    db.run(query, [title, 0], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(201).json({
            id: this.lastID,
            title,
            completed: false
        })
    })
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
