'use client'
import React, { useEffect, useState } from 'react';
import * as mqtt from 'mqtt';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

import './chat.css'; // Import your CSS file for styling


const USER_TOKEN_COOKIE_NAME = 'userToken';
const USER_NAME_COOKIE_NAME = 'userName';
const CURRENT_USER = "current"
const OUTSIDE_USER = "outside"

const options = {
  protocol: 'wss',
  username: 'Efficom-FR33515030237',
  password: 'jAcxg3tuzTTWi86',
  wsOptions: {
    host: '29157a4e5a7e4df8a00367b5eda4a93c.s1.eu.hivemq.cloud',
    protocol: 'wss',
    rejectUnauthorized: false, // Disable SSL/TLS certificate validation
  },
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([USER_TOKEN_COOKIE_NAME, USER_NAME_COOKIE_NAME]);


  useEffect(() => {
    console.log('Component mounted');

    const client = mqtt.connect(
      'wss://29157a4e5a7e4df8a00367b5eda4a93c.s1.eu.hivemq.cloud:8884/mqtt',
      options
    );

    // setup the callbacks
    client.on('connect', function () {
      console.log('MQTT client connected');
    });

    client.on('error', function (error) {
      console.log('MQTT client error:', error);
    });

    client.on('message', function (topic, message) {
      // called each time a message is received

      const newMessage = {
        senderName: JSON.parse(message.toString()).senderName,
        content: JSON.parse(message.toString()).content,
        messageSource: OUTSIDE_USER
      };

      if (cookies.userName !== newMessage.senderName) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        const chatContainer = document.getElementById('ctn')
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
      }
    });

    // subscribe to topic 'test'
    client.subscribe('test');
    //client.publish('test', 'Hello hi');

    return () => {
      // cleanup the MQTT client when component unmounts
      client.end();
    };
  }, []);

  const sendMessage = () => {
    if (inputValue) {
      const client = mqtt.connect(
        'wss://29157a4e5a7e4df8a00367b5eda4a93c.s1.eu.hivemq.cloud:8884/mqtt',
        options
      );

      const newMessage = {
        senderName: cookies.userName,
        content: inputValue,
        messageSource : CURRENT_USER
      };

      
      const chatContainer = document.getElementById('ctn')
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      

      client.publish('test', JSON.stringify(newMessage));
      setInputValue('');
    }
  };

  const logout = () => {
    removeCookie(USER_TOKEN_COOKIE_NAME);
    removeCookie(USER_NAME_COOKIE_NAME);
    router.push('/')
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>

      <div id="ctn" className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.messageSource}`}>
              <span className="chat-sender">{message.senderName}:     </span>{message.content}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Aa"
            value={inputValue}
            onChange={handleInputChange}
          />
          
        </div>
        <button className="chat-send-button" onClick={sendMessage}>
            Send
          </button>
      </div>
    </div>
  );
};

export default Chat;

