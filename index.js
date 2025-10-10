const express = require('express');
const morgan = require('morgan');
const app = express();

const cors = require('cors');
app.use(cors());


app.use(express.json());

// Custom token to log request body for POST requests
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// Use morgan with the custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// GET all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// GET info page
app.get('/info', (req, res) => {
  const numberOfPeople = persons.length;
  const currentTime = new Date();

  res.send(`
    <p>Phonebook has info for ${numberOfPeople} people</p>
    <p>${currentTime}</p>
  `);
});

// GET one person by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// DELETE person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

// POST a new person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  // Check for missing fields
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    });
  }

  // Check for duplicate name
  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  // Create and add new person
  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: body.name,
    number: body.number
  };

  persons.push(newPerson);
  res.json(newPerson);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

