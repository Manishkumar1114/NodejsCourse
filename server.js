const http = require('http');

const srvr = http.createServer((req , res) => {
  console.log('Manish');

});

srvr.listen(4000);