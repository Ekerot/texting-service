var jsonServer = require('json-server');
var server = jsonServer.create();
var middlewares = jsonServer.defaults();

var port = 3001;

server.use(middlewares);
server.listen(port, function () {
  console.log('JSON Server is running and listening on port', port);
});

server.get('/ping', (req, res) => {
  res.status(200).send({ message: 'pong' });
});

server.post('/post', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ message: 'posted' });
  }, 2000);
});
