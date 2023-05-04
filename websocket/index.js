const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const messages = [];

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    messages.push(data.toString());
    console.log(messages)
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(messages) || []);
    });
  });

  ws.send(messages);
});