const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
]

// ✅ GET all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// ✅ GET info page
app.get('/info', (request, response) => {
  const totalPersons = persons.length
  const currentTime = new Date()

  response.send(`
    <div>
      <p>Phonebook has info for ${totalPersons} people</p>
      <p>${currentTime}</p>
    </div>
  `)
})

// ✅ GET single person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: 'Person not found' })
  }
})

// ✅ DELETE person by ID
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  // 204 = No Content (successful but no response body)
  response.status(204).end()
})

// ✅ Start server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
