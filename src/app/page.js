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
    redirect('/offline/connect');
  }, []);
}
