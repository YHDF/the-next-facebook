"use client"
import * as mqtt from 'mqtt';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

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

export default function Index() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('Component mounted');


    const client = mqtt.connect("wss://29157a4e5a7e4df8a00367b5eda4a93c.s1.eu.hivemq.cloud:8884/mqtt", options);


    // setup the callbacks
    client.on('connect', function () {
      console.log('MQTT client connected');
    });

    client.on('error', function (error) {
      console.log('MQTT client error:', error);
    });

    client.on('message', function (topic, message) {
      // called each time a message is received
      console.log('Received message:', topic, message.toString());
      setMessages((prevMessages) => [...prevMessages, message.toString()]);
    });

    // subscribe to topic 'test'
    client.subscribe('test');
    redirect('/connect');
  }, []);
}
