const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const body = [];

  if (url === '/') {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(`Data from file: ${data}`);
      res.write("<html>");
      res.write("<head><title>Enter Message</title></head>");
      res.write(`<body>${data}</body>`);
      res.write(`<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>`);
      res.write("</html>");
      return res.end();
    });
  } else if (url === "/message" && method === "POST") {
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('Parsed body:', parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('Inside fs.writeFile');
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello!</h1></body>");
    res.write("</html>");
    res.end();
  }
});

// Start the server on port 4000 instead of 3000 to avoid the "address already in use" error
server.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
