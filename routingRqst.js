const http = require('http');

const srvr = http.createServer((req , res) => {
  console.log(req);
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/home') {
    res.end('Welcome home\n');
  } else if (req.url === '/about') {
    res.end('Welcome to About Us page\n');
  } else if (req.url === '/node') {
    res.end('Welcome to my Node Js project\n');
  } else {
    res.end('404 Not Found\n');
  };

});

srvr.listen(3000);