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
  response.status(204).end()
})

// ✅ POST add new person (with validation)
app.post('/api/persons', (request, response) => {
  const body = request.body

  // 1️⃣ Check for missing fields
  if (!body.name) {
    return response.status(400).json({ error: 'Name is missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'Number is missing' })
  }

  // 2️⃣ Check for duplicate name
  const nameExists = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())
  if (nameExists) {
    return response.status(400).json({ error: 'Name must be unique' })
  }

  // 3️⃣ Generate new ID
  const newId = Math.floor(Math.random() * 1000000)

  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)
  response.status(201).json(newPerson)
})

// ✅ Start server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
