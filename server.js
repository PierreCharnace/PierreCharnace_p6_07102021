const http = require('http');

const server = http.createServer((req, res) => {
    res.end ('voilà la réponse du premier serveur !');
});

server.listen(process.env.PORT || 3000);