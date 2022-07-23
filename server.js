const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


app.get('/', (req, res) => {
  res.json({
    message: "Hello from the server"
  });
});


server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});