const http = require('http');

const port = process.argv[2];

var server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end();
});

server.listen(port);