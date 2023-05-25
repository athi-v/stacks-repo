import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Update({ messages, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    const initialText = messages.find((message) => message.id === parseInt(id, 10))?.text;

    setUpdatedText(initialText || '');
  }, [id, messages]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/update/${id}`, { message: updatedText });
      onUpdate('');
      navigate('/');

    } catch (error) {
      console.error(error);
    }
   
  };

  return (
    
    <div>
      <h2>Update Message</h2>
      
      <form onSubmit={handleUpdate}>
        <input type="text" value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
