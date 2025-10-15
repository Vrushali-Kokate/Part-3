const express = require('express')
const app = express()

app.use(express.json())

const persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
]

// GET all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// ✅ NEW: /info route
app.get('/info', (request, response) => {
  const totalPersons = persons.length
  const currentTime = new Date()

  const infoHtml = `
    <div>
      <p>Phonebook has info for ${totalPersons} people</p>
      <p>${currentTime}</p>
    </div>
  `
  response.send(infoHtml)
})

// Server setup
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
