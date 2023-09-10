const Header=(props)=>{
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props)=>{
  return (<p>{props.part} {props.exercise}</p>)
}

const Content = (props)=>{
  const parts = props.parts
  return (
    <>
    <Part part={parts[0].name} exercise={parts[0].exercises}/>
      <Part part={parts[1].name} exercise={parts[1].exercises}/>
      <Part part={parts[2].name} exercise={parts[2].exercises}/>
    </>
  )
}


const Total = (props)=>{
  return (<p>Number of exercises {props.total}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  let totalExercises = 0;
  course.parts.forEach(element => {
    totalExercises+=element.exercises;
  });


  return (
    <div>
      <Header course={course.name}/>

      <Content parts={course.parts}/>

      <Total total={totalExercises}/>
    </div>
  )
}

export default App