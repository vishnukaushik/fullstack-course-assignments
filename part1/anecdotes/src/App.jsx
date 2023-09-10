import { useState } from 'react'

const DayAnecdote = (props)=>{
  const anecdote = props.anecdote
  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      {anecdote}
    </div>
    <div>
      has {props.votes} votes
    </div>
    </>
  )
}

const HighestAnecdote = (props)=>{
  const maxIndex = props.maxIndex;
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[maxIndex]}</div>
      <div>
        has {props.votes[maxIndex]} votes
      </div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0);

  const handleVoteAnecdote = ()=>{
    console.log("voted");
    const newVotes = {...votes}
    newVotes[selected]+=1
    if(newVotes[selected]>=newVotes[maxIndex])
      setMaxIndex(selected);
    setVotes(newVotes)
  }

  const handleNextAnecdote = ()=>{
    console.log("Next anecdote printed");
    // generate random number
    const nextSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(nextSelected);
  }

  return (
    <>
      <DayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={handleVoteAnecdote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>

      <HighestAnecdote anecdotes={anecdotes} votes={votes} maxIndex={maxIndex}/>
    </>
  )
}

export default App