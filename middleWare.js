 const http = require("http");
const express = require("express");

const app = express();

app.use((req, res , next) => {
  console.log('I am in MiddleWare');
  next();
})

app.use((req, res , next) => {
  console.log('I am in another MiddleWare');
  res.send('<h1>Hellooooo</h1>');
})

const server = http.createServer(app);

server.listen(3000);