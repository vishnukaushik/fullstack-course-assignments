import { useState } from 'react'

const Button = (props)=>{
  return (<button onClick={props.handleClick}>{props.text}</button>);
}

const Heading = (props)=>{
  return (
    <h1>{props.text}</h1>
  )
}

const Feedback = (props)=>{

  const eventHandler = props.eventHandler;

  return (
    <>
      <Heading text={"give feedback"}/>
      <Button handleClick={eventHandler("good")} text={"good"}/>
      <Button handleClick={eventHandler("neutral")} text={"neutral"}/>
      <Button handleClick={eventHandler("bad")} text={"bad"}/>
    </>
  )
}

const StatisticsLine = (props)=>{
  return (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>)
}

const Statistics = (props)=>{

  const total=props.good+props.neutral+props.bad;
  const average=(props.good-props.bad)/total;
  const posPercentage=(props.good*100)/total;

  if(total===0)
    return (
    <>
    <Heading text={"statistics"}/>
    <div>No feedback given</div>
    </>
    )

  return (
  <>
  <Heading text={"statistics"}/>
  <table>
    <tbody>
      <StatisticsLine text={"good"} value={props.good}/>
      <StatisticsLine text={"neutral"} value={props.neutral}/>
      <StatisticsLine text={"bad"} value={props.bad}/>
      <StatisticsLine text={"all"} value={total}/>
      <StatisticsLine text={"average"} value={average}/>
      <StatisticsLine text={"positive"} value={posPercentage+" %"}/>
    </tbody>
    </table>
  </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log("good", good);
  console.log("neutral", neutral);
  console.log("bad", bad);

  const eventHandler = (option)=>{
    if(option==="good")
      return ()=>{setGood(good+1)}
    else if(option==="neutral")
      return ()=>{setNeutral(neutral+1)}
    else
      return ()=>{setBad(bad+1)}
  }

  return (
    <div>
      <Feedback eventHandler={eventHandler}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App