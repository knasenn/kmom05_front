import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './App.css'

//yes
const socket = io.connect('134.122.73.207');
// const socket = io.connect('localhost:8333');

function Chat() {
  const [state, setStaet] = useState({ message: '', name: '', time: '' })
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({ name, message, time }) => {
      setChat([...chat, { name, message, time }])
      console.log("useEffect");
    })
  })

  const onTextChange = e => {
    setStaet({ ...state, [e.target.name]: e.target.value })
    console.log("onTextChange");
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    var d = new Date(); // for now
    let time = d.getHours()+":"+d.getMinutes();
    const { name, message } = state
    socket.emit('message', { name, message, time })
    setStaet({ message: '', name, time })
    console.log("onMessageSubmit");
  }

  const renderChat = () => {
    // var d = new Date(); // for now
    // let time_now = d.getHours() + ":" +d.getMinutes();
    return chat.map(({ name, message, time }, index) => (
      <div key={index}>
        <h3>
          {name}({time}): <span>{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h6>Messanger</h6>
        <div className="name-field">
          <TextField
            name="name"
            onChange={e => onTextChange(e)}
            value={state.name}
            id="outlined-multiline-static"
            variant="outlined"
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send</button>
      </form>
      <div className="render-chat">
        <h6>Chat</h6>
        {renderChat()}
      </div>
    </div>
  )
}

export default Chat
