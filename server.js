const app = require('./app')
const express = require('express')
const Phonebook = require('./models/phonebook')
app.use(express.json())


const errorHandler = (err, req, res, next) => {
  if(err.name === 'CastError'){
    return res.status(400).send({ error: 'misformated id' })
  }
  else if(err.name === 'ValidationError'){
    return res.status(400).send(err.message)
  }
  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

let persons = []
app.get('/api/persons', (req, res) => {
  let offset = parseInt(req.query.page || 0);
  if(offset > 0){
    offset--;
  }
  Phonebook.paginate({}, {offset: (offset * 10), limit: 10})
    .then(result =>{
      const {docs} = result;
      res.json(docs);
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Phonebook.findById(id)
    .then(person => {
      if(person){
        res.json(person)
      }
      else{
        res.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Phonebook.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  const person = {
    number: body.number
  }

  Phonebook.findByIdAndUpdate(id, person, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if(!(body.name && body.number)){
    return res.status(400).json({
      error: 'Content Missing'
    })
  }
  const person = new Phonebook({
    ...body
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(err => {
      next(err)
    })
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
