const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(express.json());

// Custom morgan token to log POST request body
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// GET all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

// GET info page
app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const info = `
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `;
      res.send(info);
    })
    .catch((error) => next(error));
});

// GET single person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST new person
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error));
});

// PUT update person (Step 5)
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' });
  }

  const updatedPerson = {
    name,
    number,
  };

  Person.findByIdAndUpdate(req.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then(result => res.json(result))
    .catch(error => next(error));
});

// DELETE person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

// Error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
