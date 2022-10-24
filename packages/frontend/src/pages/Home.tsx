import React from 'react';
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "../App.css"

function Home() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([{
        id: "1",
        text: "Hello! This is my first message",
        author: "Erik",
        timeStamp: new Date().toLocaleString()
    }])

    interface Message {
        id: string,
        text: string,
        author: string,
        timeStamp: string
    }

    const sendMessage = (messageText: string) => {
        const newMessage = {
            id: uuidv4(),
            text: messageText,
            author: "Nolle", //store username through JWT
            timeStamp: new Date().toLocaleString()
        }
        setMessages([...messages, newMessage])
        setMessage("")
    }

    return (
        <div>
            <header className="App-header">
                My Chat App
            </header>
            <div>
                {messages.map(message => {
                    return (
                        <div key={message.id} className='message'>
                            <div>
                                <h3 className='inline'>{message.author} </h3>
                                <p className='inline time'>{message.timeStamp}</p>
                            </div>
                            <p>{message.text}</p>
                        </div>
                    )
                })}
            </div>
            <div className='footer'>
                <div className='inputForm'>
                    <input
                        className='textInput'
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className='sendButton' onClick={(e) => sendMessage(message)}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;