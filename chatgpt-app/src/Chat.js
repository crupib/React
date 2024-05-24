// src/Chat.js
import React, { useState } from 'react';
import { fetchChatGPTResponse } from './api';
import Spinner from './spinner.gif';
import Nts from './nts_logo_red.png';
const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setVisible(true);
    const response = await fetchChatGPTResponse(input);
    setVisible(false);
    const botMessage = { role: 'assistant', content: response.choices[0].message.content };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div>
      <h1> NTS Mantle Chat with GPT <img src={Nts} height="100" width="100"></img></h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
    
        <button type="submit">Send</button>
        {isVisible && <img src={Spinner} alt="loading..."></img>}
      </form>
    </div>
  );
};

export default Chat;
