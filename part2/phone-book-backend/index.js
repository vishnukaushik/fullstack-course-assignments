require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const Phonebook = require('./models/phonebook');

app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((contacts) => res.json(contacts));
});

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${notes.length} people
    <br><br>${date}</p>`);
})

app.get('/api/persons/:id', (req, res, next)=>{
    const id = req.params.id

    Phonebook.findById(id).then(contact=>{
      if(contact)
        res.json(contact)
      else
        res.status(404).send('Person not found')
    }).catch(err=>next(err))
})

app.delete('/api/persons/:id',(req, res, next)=>{
    const id = req.params.id
    Phonebook.findByIdAndDelete(id).then(result=>{
      res.status(204).end()
    }).catch(err=>next(err))
})

app.post('/api/persons',(req,res,next)=>{
  let person = req.body
  // if(!(person.name && person.number))
  // {
  //   console.log("Insufficient details. Either name or Number missing");
  //   res.status(400).send({ error: 'Insufficient details. Either name or Number missing' });
  // }
  // else
  // {
    const contact = new Phonebook({
      name: person.name,
      number: person.number
    })
    contact.save().then(savedContact=>{
      console.log("Added: ", savedContact)
      res.status(201).send(savedContact)
    }).catch(err=>next(err))
  }
  // }
)

app.put('/api/persons/:id',(req,res,next)=>{
  const id = req.params.id
  const contact = req.body
  Phonebook.findByIdAndUpdate(id, contact, {
    new: true,
    runValidators: true,
    context: 'query'
  }).then(updatedContact=>{
    res.json(updatedContact)
  }).catch(err=>next(err))
})

const unknownEndpoint = (req, res)=>{
  res.status(404).send({error: 'Unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler=(error, request, response, next)=>{
  console.log(error)
  if(error.name==='CastError')
    return response.status(400).send({error: 'Malformed id'})
  else if(error.name==='ValidationError')
    return response.status(400).send({error: error.message})
  next(error)
}
app.use(errorHandler)

const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })