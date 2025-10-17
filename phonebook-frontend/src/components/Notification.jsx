// const Notification = ({ message, type }) => {
//   if (message === null) return null

//   const notificationStyle = {
//     color: type === 'error' ? 'red' : 'green',
//     background: 'lightgrey',
//     fontSize: 20,
//     borderStyle: 'solid',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//   }

//   return <div style={notificationStyle}>{message}</div>
// }

// export default Notification

const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: '#eee',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    padding: '10px',
    marginBottom: '10px',
    fontSize: '1.2rem'
  }

  return <div style={style}>{message}</div>
}

export default Notification
