const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const cors = require('cors');
const Person = require('./models/person');

app.use(cors());


app.use(express.json());

// Custom token to log request body for POST requests
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// Use morgan with the custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//use get api
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
      res.json(persons);
      } else {
        res.status(404).end();
      }
    }).catch((error) => {
      console.error(error);
      res.status(500).end();
    });

  });

  //use post api
  app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name==undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch((error) => {
      console.log(error);
      res.status(500).json({error:"Failed to save person!"});
    });
})

//use delete api
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({error:"malformed id"});
    });
})

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});