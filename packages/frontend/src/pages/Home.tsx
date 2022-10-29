import React from 'react';
import { useState, useEffect } from "react"
import "../App.css"
import MessageItem from "@my-chat-app-typescript/shared"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001"

const fetchMessages = async (): Promise<MessageItem[]> => {
    const response = await axios.get<MessageItem[]>("message")
    return response.data
}

function Home() {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<MessageItem[]>([])
    const [error, setError] = useState<string | undefined>()

    const sendMessage = async (messageText: string): Promise<void> => {
        const newMessage: MessageItem = {
            text: messageText,
            author: localStorage.getItem("userName"),
            timeStamp: new Date()
        }

        try {
            await axios.post("/message", newMessage)
            const response = await axios.get<MessageItem[]>("/message")
            setMessages(response.data)
        } catch (err) {
            setMessages([])
            setError("Could not get chat history")
        } finally {
            setMessage("")
        }
    }

    useEffect(() => {
        fetchMessages()
                .then(setMessages)
                .catch((_error) => {
                    setMessages([])
                    setError("fetchMessages could not fetch messages")
                })
        const interval = setInterval(() => {
            fetchMessages()
                .then(setMessages)
                .catch((_error) => {
                    setMessages([])
                    setError("fetchMessages could not fetch messages")
                })
        }, 5000)
        return () => clearInterval(interval)
    }, [])

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
                                <p className='inline time'>{message.timeStamp.toString()}</p>
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
                        placeholder="Message"
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