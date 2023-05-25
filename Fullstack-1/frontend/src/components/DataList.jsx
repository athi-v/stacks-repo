import React from 'react'
import {useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from 'react';


const DataList = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [nextId, setNextId] = useState(1);
    const navigate = useNavigate();
  
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/messages');
          console.log(response.data)
          setMessages(response.data);
          setNextId(response.data.length + 1);
    
        }
        catch(error) {
          <p>Error getting the message</p>
          console.error('Error getting the message!')
        }
      }

      const updateMessage = (id, text) => {
        setNewMessage(text);
        navigate(`/update/${id}`);
      };

      const removeMessage = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/delete/${id}`);
          setMessages(messages.filter((message) => message.id != id));
          
        } catch (error) {
          
        }
          }
        

      useEffect(() => {
        fetchData();
    }, [])
    
  return (
    <div> <h2>Messages</h2>
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          {message.text}
          <button onClick={() => updateMessage(message.id, message.text)}>Update</button>
          <button onClick={() => removeMessage(message.id)}>Delete</button>
        </li>
      ))}
    </ul></div>
  )
}

export default DataList