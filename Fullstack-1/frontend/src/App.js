import {Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from 'react';
import Update from "./components/Update";
import Navbar from "./components/Navbar";
import DataList from "./components/DataList";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();


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
      navigate('/');
    }
    catch(error) {
      console.error('Error adding new message!')
    }
  }




 
  return (
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<DataList />} />
          <Route path="/add" element={
 <div>
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
