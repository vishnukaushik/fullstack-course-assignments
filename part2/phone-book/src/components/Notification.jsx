export const Notification = ({message})=>{
    var notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    
    if(message===null)
        return null

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export const ErrorNotification = ({errorMessage})=>{
    const notificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    
    if(errorMessage===null)
        return null

    return (
        <div style={notificationStyle}>
            {errorMessage}
        </div>
    )
}