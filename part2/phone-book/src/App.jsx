import { useEffect, useState } from 'react'
import phonebookServices from './services/phonebookServices'
import {Notification, ErrorNotification} from './components/Notification'

const Filter = ({inputSearch, handleSearchChange})=>{
  return (
  <div>
    filter shown with: <input value={inputSearch} onChange={handleSearchChange}/>
  </div>
  )
}

const PersonForm = ({addPhone, newContact, handleNameChange, handleNumberChange})=>{
  return (
    <form onSubmit={addPhone}>
      <div>
        name: <input value={newContact.name} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newContact.number} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person, onDelete})=>{
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onDelete}>delete</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newContact, setNewContact] = useState({name:'', number:''})
  const [inputSearch, setInputSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    phonebookServices.getAll()
      .then(data=>{
        setPersons(data)
      })
  },[])

  const addPhone = (event)=>{
    event.preventDefault();
    const newPerson = {
      name: newContact.name,
      number: newContact.number
    }
    const person = persons.find(p=> p.name===newPerson.name)
    if(person)
    {
      const res = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if(res){
        phonebookServices.update(person.id, newPerson)
        .then(data=> {
          setPersons(persons.map(p=> p.id===data.id?data:p))
          setMessage(`Updated ${newPerson.name}`)
          setTimeout(()=>{setMessage(null)},5000)  
        })
      }
    }
    else
    {
      phonebookServices.create(newPerson)
      .then(data=>{
        setPersons(persons.concat(data))
        setMessage(`Added ${newPerson.name}`)
        setTimeout(()=>{setMessage(null)},5000)
      })
      
    }
    setNewContact({name:'', number:''})
  }

  const handleNameChange = (event)=>{
    const contact = newContact
    setNewContact({
      name: event.target.value,
      number: contact.number
    })
  }

  const handleNumberChange = (event)=>{
    const contact = newContact
    setNewContact({
      name: contact.name,
      number: event.target.value
    })
  }

  const handleSearchChange = (event)=>{
    setInputSearch(event.target.value)
  }

  const deletePersonOf = (person)=>{
    if(window.confirm(`Delete ${person.name} ?`)){
      phonebookServices.deleteContact(person.id).then(data=>{
        setPersons(persons.filter(p=> p.id!==person.id))
        setMessage(`Deleted ${person.name}`)
        setTimeout(()=>{setMessage(null)},5000)
      })
      .catch((err)=>{
        setPersons(persons.filter(p=> p.id!==person.id))
        setErrorMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(()=>{setErrorMessage(null)},5000)
      })
    }
  }

  const filteredPersons = persons.filter(person=> person.name.toLowerCase().includes(inputSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} overrideStyles={{color: "red"}}/>
      <ErrorNotification errorMessage={errorMessage}/> 
      <Filter inputSearch={inputSearch} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addPhone={addPhone} newContact={newContact} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person  key={person.name} onDelete={()=>deletePersonOf(person)} person={person}/>)}
    </div>
  )
}

export default App