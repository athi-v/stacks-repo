import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from 'react';
import Update from "./components/Update";

function App() {
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

  const createMessage = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/add', {
        message: newMessage
      });
      const messageObj = {
        id: nextId, text: response.data.text
      }
      setMessages([...messages, messageObj]);
      setNextId(nextId + 1);
      setNewMessage('');
      await fetchData();

    }
    catch(error) {
      console.error('Error adding new message!')
    }
  }

  const removeMessage = async (id) => {
try {
  await axios.delete(`http://localhost:8000/delete/${id}`);
  setMessages(messages.filter((message) => message.id != id));
  
} catch (error) {
  
}
  }

  const updateMessage = (id, text) => {
    setNewMessage(text);
    navigate(`/update/${id}`);
  };

  

  useEffect(() => {
    fetchData();
}, [])
 
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={
 <div>
              <h2>Messages</h2>
              <ul>
                {messages.map((message) => (
                  <li key={message.id}>
                    {message.text}
                    <button onClick={() => updateMessage(message.id, message.text)}>Update</button>
                    <button onClick={() => removeMessage(message.id)}>Delete</button>
                  </li>
                ))}
              </ul>
              <form onSubmit={createMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Add Message</button>
              </form>
            </div>
          } />
           
        
          <Route path="/update/:id" element={ <Update
    messages={messages}
    onUpdate={(updatedText) => setNewMessage(updatedText)}
  /> } />
            
        </Routes>
      </div>
  )
}

export default App;
