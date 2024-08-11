const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the login form
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Enter your username" required>
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  res.send(`
    <script>
      localStorage.setItem('username', '${username}');
      window.location.href = '/';
    </script>
  `);
});

// Serve the home page with the send message form and display messages
app.get('/', (req, res) => {
  let messagesHtml = '';

  // Read the messages from the file
  if (fs.existsSync(path.join(__dirname, 'messages.json'))) {
    const messages = fs.readFileSync(path.join(__dirname, 'messages.json'), 'utf-8').trim().split('\n');
    messagesHtml = messages.map(msg => {
      const { username, message } = JSON.parse(msg);
      return `<p><strong>${username}:</strong> ${message}</p>`;
    }).join('');
  }

  res.send(`
    <form action="/send-message" method="POST">
      <input type="text" name="message" placeholder="Enter your message" required>
      <button type="submit">Send Message</button>
    </form>
    ${messagesHtml}
  `);
});

// Handle message form submission
app.post('/send-message', (req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  const data = { username: username, message: message };

  // Append the message to the file
  fs.appendFileSync(path.join(__dirname, 'messages.json'), JSON.stringify(data) + '\n');
  
  res.redirect('/');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
