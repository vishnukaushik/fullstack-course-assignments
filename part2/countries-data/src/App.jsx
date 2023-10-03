import { useEffect, useState } from 'react'
import axios from 'axios'

const Body = ({countries, handleClick})=>{

  if(countries.length>10)
    return (<div>Too many matches, specify another filter.</div>)
  else if(countries.length===1)
  {
    const country = countries[0]
    var weather;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}`)
      .then(response=>
        weather = response.data
      )
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital[0]}</div>
        <div>Area: {country.area}</div>

        <h3>languages:</h3>
        <ul>
        {Object.values(country.languages).map(language=><li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags['png']}></img>
      </div>
    )
  }
  else 
    return (
      <div>
        {countries.map((country, id)=><div key={country.name.common}>{country.name.common}<button onClick={()=>handleClick(id)}>show</button></div>)}
      </div>
    )
}

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(()=>{
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response)=>{
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  },[])

  const handleChange = (event)=>{
    setValue(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value)))
  }

  const handleClick = (id)=>{
    setFilteredCountries([].concat(filteredCountries[id]))
  }

  return (
    <div>
      Find countries: <input value={value} onChange={handleChange}></input>
      <Body countries={filteredCountries} handleClick={handleClick}/>
    </div>
  )
}

export default App
