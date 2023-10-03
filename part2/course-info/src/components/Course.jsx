const Course = ({course})=>{
    let totalExercises = course.parts.reduce((total, part)=>total+part.exercises, 0)
    return (
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total total={totalExercises}/>
    </div>
    )
}

const Header=(props)=>{
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props)=>{
    const parts = props.parts

    return (
        <>
        {parts.map((part)=>{
            return <Part key={part.id} part={part.name} exercise={part.exercises}></Part>
        })}
        </>
        )
}

const Part = (props)=>{
    return (<p>{props.part} {props.exercise}</p>)
}

const Total = (props)=>{
    return (<p><b>Number of exercises {props.total}</b></p>)
}

export default Course