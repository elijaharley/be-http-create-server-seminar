const http = require('http');
const fs = require('fs/promises');

const server = http.createServer((request, response) => {
  // This function is invoked when a request comes in
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

  if (request.url === '/cats' && request.method === 'POST') {
    let body = '';
    request.on('data', (packet) => {
      body += packet.toString();
    });
    request.on('end', () => {
      const newCat = JSON.parse(body);
      fs.readFile(`${__dirname}/data/cats.json`, 'utf-8')
        .then((data) => {
          const originalCats = JSON.parse(data);
          originalCats.push(newCat);
          fs.writeFile(
            `${__dirname}/data/cats.json`,
            JSON.stringify(originalCats, null, 2)
          );
        })
        .then(() => {
          response.setHeader('Content-Type', 'application/json');
          response.statusCode = 201;
          response.write(JSON.stringify({ cats: newCat }));
          response.end();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    request.on('error', ()=>{
      console.log(error);
    });
  }
});

server.listen(9090, (err) => {
  if (err) {
  } else {
    console.log('Server listening on port 9090...');
  }
});
