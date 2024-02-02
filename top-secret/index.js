const http = require('http');
const fs = require('fs/promises');

const app = http.createServer((request, response) => {
  const { method, url } = request;

  if (url === '/api') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const body = JSON.stringify({ msg: 'hello world' });
    response.write(body);
    response.end();
  }

  if (url === '/api/facts' && method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    fs.readFile('./top-secret/facts.json', 'utf-8')
      .then((factsResponse) => {
        const parsedFacts = JSON.parse(factsResponse);
        const facts = { facts: parsedFacts };
        response.end(JSON.stringify(facts));
      })
      .catch(() => {
        console.log('something went wrong!');
        response.writeHead(404, { 'Content-Type': 'application/json' });
      });
  }

  if (url === '/api/facts' && method === 'POST') {
    let body = '';
    request.on('data', (packet) => {
      body += packet.toString();
    });
    request.on('end', () => {
      const newFact = JSON.parse(body);
      fs.readFile('./top-secret/facts.json', 'utf-8')
        .then((facts) => {
          const ogFacts = JSON.parse(facts);
          newFact.id = ogFacts.length + 1;
          const updatedFacts = [...ogFacts, newFact];
          return fs.writeFile('./top-secret/facts.json', JSON.stringify(updatedFacts))
        })
        .then(() => {
          response.writeHead(201, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ facts: newFact }));
        })
        .catch((err) => {
          console.log(err);
        });

  })}
});

app.listen(9090, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('listening on 9090!');
  }
});
