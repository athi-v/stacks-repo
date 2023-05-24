const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let messages = [];
let nextId = 1;

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/add', (req, res) => {
  const { message } = req.body;
  const newMessage = {
    id: nextId,
    text: message,
  };
  messages.push(newMessage);
  nextId++
  res.json(newMessage);
});


app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const messageIndex = messages.findIndex((msg) => msg.id === parseInt(id, 10));

  if (messageIndex === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  messages[messageIndex].text = message;

  res.json({ success: true });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = messages.findIndex((message) => message.id === parseInt(id));
  if (index !== -1) {
    const deletedMessage = messages.splice(index, 1);
    res.json(deletedMessage);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
