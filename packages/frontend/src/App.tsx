import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageItem from "@my-chat-app-typescript/shared";


function App() {
  const [message, setmessage] = useState<MessageItem>({
    id: '123',
    text: "Mitt meddelande!",
    author: "nolle",
    timeStamp: new Date()
  })
  return (
    <div className="App">
      <header className="App-header">
        {message.text} - {message.author}
      </header>
    </div>
  );
}

export default App;
