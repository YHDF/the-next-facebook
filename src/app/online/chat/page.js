'use client'
import React, { useEffect, useState } from 'react';
import * as mqtt from 'mqtt';
import { useCookies } from 'react-cookie';
import { useRouter, useSearchParams } from 'next/navigation';

import './chat.css'; // Import your CSS file for styling


const USER_TOKEN_COOKIE_NAME = 'userToken';
const USER_NAME_COOKIE_NAME = 'userName';
const USER_ID_COOKIE_NAME = 'userId';

const CURRENT_USER = "current"
const OUTSIDE_USER = "outside"

const PB_API_URL_PREFIX = 'http://127.0.0.1:8090';

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
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([USER_TOKEN_COOKIE_NAME, USER_NAME_COOKIE_NAME, USER_ID_COOKIE_NAME]);
  const [recordId, setRecordId] = useState('');
  const [channel, setChannel] = useState('');

  const buildPBMessageObject = (inputValue) => {
    let messageObjectPB = messages.map((message) => ({
      username: message.senderName,
      message: message.content,
      timestamp: message.timestamp
    }));
    messageObjectPB = messageObjectPB.concat({
      username: cookies.userName,
      message: inputValue,
      timestamp: Date.now().toString()
    });
    return messageObjectPB;
  }
  

  const getOrCreateDiscussion = async (user) => {
    const payload = [
      {
        id: user.id,
        username: user.username
      },
      {
        id: cookies.userId,
        username: cookies.userName
      }
    ]
    const response = await fetch(`/api/discussion/bi-dialogue`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  };

  const updateDiscussionHistory = async (discussionId, message) => {
    const response = await fetch(`${PB_API_URL_PREFIX}/api/collections/discussions/records/${discussionId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"messages" : JSON.stringify(message)})
    });
    return response.json();
  }

  useEffect(() => {
    console.log('Component mounted');

    const userId = searchParams.get('uid');
    const userName = searchParams.get('uname');
    getOrCreateDiscussion({ username: userName, id: userId }).then((results) => {
      if (results?.items?.length > 0) {
        setRecordId((oldRecordId) => results?.items[0].id)
        setChannel((oldChannel) => results?.items[0].channel)
        client.subscribe(results?.items[0].channel);
        let sortedMessages = []
        if(results?.items[0]?.messages != "") {
           sortedMessages = JSON.parse(results?.items[0].messages).sort((a, b) => a.timestamp - b.timestamp);
        }
        setMessages((prevMessages) => {
          prevMessages = [];
          sortedMessages.forEach((message) => {
            const newMessage = {
              senderName: message.username,
              content: message.message,
              messageSource: message.username != cookies.userName ? OUTSIDE_USER : CURRENT_USER,
              timestamp: message.timestamp
            }
            prevMessages.push(newMessage);
          })
          return prevMessages;
        });
      }
    })
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
        messageSource: CURRENT_USER
      };

      client.publish(channel, JSON.stringify(newMessage));

      const chatContainer = document.getElementById('ctn')
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
      setMessages((prevMessages) => [...prevMessages, newMessage]);


      const PBMessageObject = buildPBMessageObject(inputValue);

      updateDiscussionHistory(recordId, PBMessageObject)
 
      setInputValue('');
    }
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
          Envoyer
        </button>
        
      </div>
    </div>
  );
};

export default Chat;

