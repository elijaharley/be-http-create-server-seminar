const http = require('http');
const fs = require('fs/promises');

// GET - Path: '/' - 'hello world!'
// GET - Path: '/cats' - { cats: [ {name: .., colour: ...} ] }

const server = http.createServer((request, response) => {
  // This function is invoked when a request comes in

  // request - info about the request
  console.log(request.url, request.method);
  // response - methods to set what the response should be

  if (request.url === '/' && request.method === 'GET') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    const body = { msg: 'Hello world!' };
    response.write(JSON.stringify(body));
    response.end();
  }

  if (request.url === '/cats' && request.method === 'GET') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    fs.readFile(`${__dirname}/data/cats.json`, 'utf-8').then((catInfo) => {
      const parsedCats = JSON.parse(catInfo);
      const cats = { cats: parsedCats };
      response.write(JSON.stringify(cats));
      response.end();
    });
  }

  // read file
  // send new data from insomnia
  // write to the file
  // send back data to confirm
  if (request.url === '/cats' && request.method === 'POST') {
    let body = '';
    request.on('data', (packet) => {
      body += packet.toString();
    });
    request.on('end', () => {
      const parsedBody = JSON.parse(body);
      fs.readFile('./data/cats.json', 'utf-8')
        .then((data) => {
          const ogCats = JSON.parse(data);
          const newCats = [...ogCats];
          newCats.push(parsedBody);
          fs.writeFile('./data/cats.json', JSON.stringify(newCats, null, 2));
        })
        .then(() => {
          response.setHeader('Content-Type', 'application/json');
          response.statusCode = 201;
          response.write(JSON.stringify({ cats: parsedBody }));
          response.end();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
});

server.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening on port 8080...');
  }
});
